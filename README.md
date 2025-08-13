# Release Composite Action

[![Push Events](https://github.com/agrc/release-composite-action/actions/workflows/push.yml/badge.svg)](https://github.com/agrc/release-composite-action/actions/workflows/push.yml)

This action is a wrapper around Google's [release-please](https://github.com/googleapis/release-please) that adds some UGRC-specific conventions and enhancements.

## Usage

```yml
# push.yml
name: Push Events

on:
  push:
    branches:
      - dev
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  release:
    name: Create release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: agrc/release-composite-action@v1
        with:
          create-major-minor-tags: true
          prerelease: ${{ github.ref_name == 'dev' }}
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          github-app-id: ${{ secrets.UGRC_RELEASE_BOT_APP_ID }}
          github-app-key: ${{ secrets.UGRC_RELEASE_BOT_APP_KEY }}
          github-app-name: ${{ secrets.UGRC_RELEASE_BOT_NAME }}
          github-app-email: ${{ secrets.UGRC_RELEASE_BOT_EMAIL }}
```

## Commits

Commits should have the following format:

```text
<type>[(optional scope)]: <summary>

[optional body]

[optional footer]
```

### Commit Types

This action uses release-please to auto-generates a changelog based on commits using the [Angular preset for Conventional Commits](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

The following commit message types trigger new releases.

| Type | Description | Release Type | Changelog Section |
| -- | -- | -- | -- |
| `feat` | A new feature | Minor | Features |
| `fix` | A bug fix | Patch | Bug Fixes |
| `docs` | Documentation updates | Patch | Documentation |
| `style` | Changes to the appearance of the project/UI | Patch | Styles |
| `deps` | A dependency update. Dependabot should [be configured](https://github.com/agrc/release-composite-action/blob/6bdccbb5a1f882e756a3e6e09a3b3f699c55bfd4/.github/dependabot.yml#L12-L14) to use this prefix. | Patch | Dependencies |

The following commit message types are supported but will not trigger a release or show up in the changelog.
| Type | Description |
| -- | -- |
| `chore` | Any sort of change that does not affect the deployed project |
| `ci` | Changes to CI configuration files and scripts |
| `perf` | A code change that improves performance |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `test` | Adding missing tests or correcting existing tests |

### Scope

Scopes are a way to add context to the commits and therefore the changelog. They are optional and should be in parentheses. For example:

```text
feat(app): add a new app feature
feat(api): add a new api feature
feat: add a new feature
```

This commit message would show up like this in the changelog:

```markdown
### Features

- **app:** add a new app feature (<sha>)
- **api:** add a new api feature (<sha>)
- add a new feature (<sha>)
```

### Summary

Commit summaries should be written using imperative, present tense ("fix" not "fixed" or "fixes"), lowercase (do not capitalize the first word or use punctuation). The commit summaries are added to the changelog.

For example:

```text
feat: add a new feature
```

### Body

Continue to use imperative, present tense. The body should include a more detailed description of the change. This is where you can provide more context and reasoning for the change. The body does not show up in the changelog.

### Footer

The footer should contain any references to GitHub issues: `closes #1234`, `refs #1234`, etc. `closes` will automatically close the issue when the commit is merged and `refs` will add a link to the commit in the referenced issue or pull request. The footer may also include information about a breaking change (see below).

> [!NOTE]
> The body is not required to use the footer.

### Breaking Changes

If a commit introduces a breaking change, add a `!` after the type and optional scope. This will trigger a major version bump.

> [!IMPORTANT]
> A `BREAKING CHANGE: <summary of breaking change>` section is required in the commit footer.

```text
fix!: add missing constructor parameter

Some detailed description that will not show up in the changelog.

BREAKING CHANGE: summary of breaking change
- breaking change description
- migration instructions
- etc

Anything after the first blank line will not be included in the changelog.
```

The above commit would show up in the changelog like this:

```markdown
### ⚠ BREAKING CHANGES

* summary of breaking change
    - breaking change description
    - migration instructions
    - etc

### Bug Fixes

* add missing constructor parameter ([5b757c3](https://github.com/agrc/release-composite-action/commit/5b757c31c4bb2e04efb19c6de1dacd0689bcbe72))
```

> [!NOTE]
> This follow are available to use with breaking changes: `feat!`, `fix!`, or `refactor!`
> They also work with scopes: `feat(scope)!`, `fix(scope)!`, or `refactor(scope)!`

You may dig into the [release-please](https://github.com/googleapis/release-please#how-should-i-write-my-commits) and the [Angular preset](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-footer) documentation for more information.

### Forcing a Specific Version

This action's use of release-please does not support their [method for forcing a specific release version](https://github.com/googleapis/release-please#how-do-i-change-the-version-number) due to our use of [agrc/get-next-version-action](https://github.com/agrc/get-next-version-action). However, you can achieve the same results by manually updating an open release PR. Here are the things that you need to change to match the desired version:

- PR Title
- Changelog within PR description
- Update any files changed with a new commit
- Fixup the newly created commit into the original release commit and reword the commit summary

Once the above changes have been completed, you may merge the PR and the release should be created using the new version number.

### Extra Files

Sometimes you have extra files in which you want the version number bumped. To achieve this, you pass them to the `extra-files` input. For example:

```yml
  with:
    extra-files: path/to/file2,another/path/to/file3
```

You also need to tag the version in the extra files with a special comment.

```js
{
  "version": "1.2.3" // x-release-please-version
}
```

### Initial Release

The initial release for a project should default to `v1.0.0` if the current version is less a major 1.

## Development

### Act Test Runner

If you are using rancher, make sure to set the following environment variable prior to running act:

```sh
export DOCKER_HOST=$(docker context inspect --format '{{.Endpoints.docker.Host}}')
```

An example of running the tests with act:

```sh
act --env TEST_TOKEN="$(gh auth token)"
```
