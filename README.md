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

## How should I write my commits?

This action uses release-please to auto-generates a changelog based on commits using the [Angular preset for Conventional Commits](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

The following commit message prefixes are supported. "*" denotes that the prefix triggers a build. Everything but `feat` will be considered a patch release.

| Prefix | Description | Release Type | Changelog Section |
| -- | -- | -- | -- |
| `feat` | A new feature | Minor | Features |
| `fix` | A bug fix | Patch | Bug Fixes |
| `docs` | Documentation updates | Patch | Documentation |
| `style` | Changes to the appearance of the project/UI | Patch | Styles |
| `deps` | A dependency update | Patch | Dependencies |

The following commit message prefixes are supported but will not trigger a release or show up in the Change Log.
| Prefix | Description |
| -- | -- |
| `chore` | Any sort of change that does not affect the deployed project |
| `ci` | Changes to CI configuration files and scripts |
| `perf` | A code change that improves performance |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `test` | Adding missing tests or correcting existing tests |

Commit messages should be written using imperative, present tense ("fix" not "fixed" or "fixes"), sentence case (capitalize the first word), and should not end with a period.

### Breaking Changes

If a commit introduces a breaking change, add a "!" after the prefix. This will trigger a major version bump. You should also add a `BREAKING CHANGE:` section to the commit body.

```text
feat!: add a new feature

BREAKING CHANGE: <summary of breaking change>

<breaking change description and migration instructions>
```

You may dig into the [release-please](https://github.com/googleapis/release-please#how-should-i-write-my-commits) and the [Angular preset](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-footer) documentation for more information.

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
