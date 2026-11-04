const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const action = readFileSync(path.join(__dirname, '../action.yml'), 'utf8');

function stepBody(name, key, indentation) {
  const step = action.split(`    - name: ${name}\n`)[1]?.split('\n    - name:')[0];
  assert.ok(step, `Missing step: ${name}`);
  const body = step.split(`${' '.repeat(indentation)}${key}: |\n`)[1];
  assert.ok(body, `Missing ${key} in ${name}`);
  return body.trimEnd().split('\n').map((line) => line.slice(indentation + 2)).join('\n');
}

const releaseScript = stepBody('Read published release', 'script', 8);
const tagScript = stepBody('\u{1F3F7}\uFE0F Tag major and minor versions', 'run', 6);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

async function releaseDetails(pages, commits, prerelease = 'false') {
  const outputs = {};
  const github = {
    paginate: {
      async *iterator() {
        for (const data of pages) {
          yield { data };
        }
      },
    },
    rest: {
      repos: {
        listReleases() {},
        async getCommit({ ref }) {
          assert.ok(ref.startsWith('refs/tags/'), `Ambiguous tag lookup: ${ref}`);
          const tag = ref.slice('refs/tags/'.length);
          if (commits[tag] instanceof Error) {
            throw commits[tag];
          }
          assert.ok(commits[tag], `Unexpected tag lookup: ${ref}`);
          return { data: { sha: commits[tag] } };
        },
      },
    },
  };
  await new AsyncFunction('github', 'context', 'core', 'process', releaseScript)(
    github,
    { repo: { owner: 'agrc', repo: 'example' }, sha: 'released-commit' },
    { setOutput: (key, value) => { outputs[key] = value; } },
    { env: { PRERELEASE: prerelease } },
  );
  return outputs;
}

function release(tag_name, options = {}) {
  return { tag_name, draft: false, prerelease: false, ...options };
}

test('uses the published major version, not the predicted 1.0.26', async () => {
  const outputs = await releaseDetails(
    [[release('v2.0.0')]],
    { 'v2.0.0': 'released-commit' },
  );
  assert.deepEqual(outputs, {
    version: '2.0.0', major: '2', minor: '0', tag: 'v2.0.0',
    sha: 'released-commit', release_created: 'yes',
  });
  assert.match(action, /value: \$\{\{ steps\.release-details\.outputs\.version \}\}/);
  assert.match(action, /MAJOR: \$\{\{ steps\.release-details\.outputs\.major \}\}/);
  assert.match(action, /MINOR: \$\{\{ steps\.release-details\.outputs\.minor \}\}/);
});

test('paginates and ignores drafts, prereleases, and releases on other commits', async () => {
  const outputs = await releaseDetails([
    [release('v3.0.0', { draft: true }), release('v2.1.0-0', { prerelease: true }),
      release('v1.0.25')],
    [release('v2.4.3')],
  ], { 'v1.0.25': 'old-commit', 'v2.4.3': 'released-commit' });
  assert.equal(outputs.version, '2.4.3');
  assert.equal(outputs.minor, '4');
});

test('preserves prerelease versions and gates floating tags to stable releases', async () => {
  const outputs = await releaseDetails(
    [[release('v2.0.0-rc.1+build.2', { prerelease: true })]],
    { 'v2.0.0-rc.1+build.2': 'released-commit' },
    'true',
  );
  assert.equal(outputs.version, '2.0.0-rc.1+build.2');
  const tagStep = action.split('    - name: \u{1F3F7}\uFE0F Tag major and minor versions\n')[1];
  assert.match(tagStep, /inputs\.prerelease != 'true'/);
  assert.match(tagStep, /steps\.release-details\.outputs\.release_created == 'yes'/);
});

test('fails explicitly when no release matches or the tag is unsupported', async () => {
  await assert.rejects(releaseDetails([[]], {}), /No published release found/);
  await assert.rejects(releaseDetails(
    [[release('component-v2.0.0')]], { 'component-v2.0.0': 'released-commit' },
  ), /Unexpected release tag/);
});

test('propagates GitHub lookup failures', async () => {
  await assert.rejects(releaseDetails(
    [[release('v2.0.0')]], { 'v2.0.0': new Error('GitHub unavailable') },
  ), /GitHub unavailable/);
});

function gitFixture(t) {
  const directory = mkdtempSync(path.join(tmpdir(), 'release-tags-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const remote = path.join(directory, 'remote.git');
  const local = path.join(directory, 'local');
  const git = (...args) => execFileSync('git', args, { cwd: local, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  execFileSync('git', ['init', '--bare', remote], { stdio: 'ignore' });
  execFileSync('git', ['clone', remote, local], { stdio: 'ignore' });
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.com');
  git('commit', '--allow-empty', '-m', 'old release');
  const old = git('rev-parse', 'HEAD');
  for (const tag of ['v1', 'v1.0', 'v2', 'v2.0']) {
    git('tag', '-a', tag, '-m', tag);
  }
  git('push', '--tags', 'origin');
  git('commit', '--allow-empty', '-m', 'new release');
  const released = git('rev-parse', 'HEAD');
  git('tag', 'v2.0.0');
  git('push', 'origin', 'refs/tags/v2.0.0');
  git('commit', '--allow-empty', '-m', 'unreleased commit');
  const run = () => spawnSync('bash', ['-e', '-o', 'pipefail', '-c', tagScript], {
    cwd: local,
    encoding: 'utf8',
    env: { ...process.env, MAJOR: '2', MINOR: '0', RELEASE_TAG: 'v2.0.0', RELEASE_SHA: released },
  });
  const remoteSha = (tag) => execFileSync('git', ['--git-dir', remote, 'rev-parse', `${tag}^{commit}`], { encoding: 'utf8' }).trim();
  return { git, old, released, remote, run, remoteSha };
}

test('atomically updates both aliases to the release, preserves v1, and is repeatable', (t) => {
  const fixture = gitFixture(t);
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = fixture.run();
    assert.equal(result.status, 0, result.stderr);
    for (const tag of ['v2', 'v2.0']) {
      assert.equal(fixture.remoteSha(tag), fixture.released);
    }
    for (const tag of ['v1', 'v1.0']) {
      assert.equal(fixture.remoteSha(tag), fixture.old);
    }
  }
});

test('a rejected minor alias leaves both remote aliases unchanged', (t) => {
  const fixture = gitFixture(t);
  writeFileSync(path.join(fixture.remote, 'hooks/update'), '#!/bin/sh\n[ "$1" != "refs/tags/v2.0" ]\n', { mode: 0o755 });
  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /atomic push failure/);
  assert.equal(fixture.remoteSha('v2'), fixture.old);
  assert.equal(fixture.remoteSha('v2.0'), fixture.old);
});

test('creates aliases for the first release in a new major', (t) => {
  const fixture = gitFixture(t);
  fixture.git('push', 'origin', ':refs/tags/v2', ':refs/tags/v2.0');
  fixture.git('tag', '-d', 'v2', 'v2.0');
  const result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fixture.remoteSha('v2'), fixture.released);
  assert.equal(fixture.remoteSha('v2.0'), fixture.released);
});

test('a missing release tag fails before changing either alias', (t) => {
  const fixture = gitFixture(t);
  fixture.git('push', 'origin', ':refs/tags/v2.0.0');
  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.equal(fixture.remoteSha('v2'), fixture.old);
  assert.equal(fixture.remoteSha('v2.0'), fixture.old);
});
