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

Scopes are a way of separating out the different parts of your project creating separate release pipelines for each of them. They are optional and should be in parentheses. For example:

```text
feat(core): add a new feature
```

Release please will use the scope to group releases and commits in the changelog. You may need a [manifest file](https://github.com/agrc/api.mapserv.utah.gov/blob/main/.release-please-manifest.json).

### Summary

Commit summaries should be written using imperative, present tense ("fix" not "fixed" or "fixes"), sentence case (capitalize the first word), and should not end with a period. These are generally what show up in the changelog.

For example:

```text
feat: add a new feature
```

### Body

Continue to use imperative, present tense. The body should include a more detailed description of the change. This is where you can provide more context and reasoning for the change. The body does not show up in the changelog.

### Footer

The footer should contain any references to GitHub issues: `Fixes #1234`, `Resolves #1234`, etc. This will automatically close the issue when the commit is merged. It may also include information about a breaking change (see below).

### Breaking Changes

If a commit introduces a breaking change, add a "!" after the type. This will trigger a major version bump. You should also add a `BREAKING CHANGE:` section to the commit body.

```text
feat!: add a new feature

BREAKING CHANGE: <summary of breaking change>
<breaking change description and migration instructions>

Anything after the first blank line will not be included in the changelog.
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
