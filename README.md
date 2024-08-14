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

Release please auto-generates a changelog based on commits using the [Angular preset for Conventional Commits](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

The following commit message prefixes are supported. "*" denotes that the prefix triggers a build. Everything but `feat` will be considered a patch release.

- `feat`*: A new feature
- `fix`*: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `deps`*: A dependency update

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
