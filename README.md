# Release Composite Action

[![Push Events](https://github.com/agrc/release-composite-action/actions/workflows/push.yml/badge.svg)](https://github.com/agrc/release-composite-action/actions/workflows/push.yml)

Automated releases based on the [Angular preset for Conventional Commits](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

## Usage

```yml
name: Push Events

on:
  push:
    branches:
      - dev
      - main

permissions:
  contents: write
  id-token: write
  deployments: write
  pull-requests: write

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  release:
    name: Create release
    runs-on: ubuntu-latest

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

## Development

### Act Test Runner

If you are using rancher, make sure to set the following environment variable prior to running act:

```sh
export DOCKER_HOST=$(docker context inspect --format '{{.Endpoints.docker.Host}}')
```

To run act:

```sh
act -s GITHUB_TOKEN="$(gh auth token)"
```
