# release-composite-action

Automated releases

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
  group: '${{ github.ref_name }}'
  cancel-in-progress: true

jobs:
  release:
    name: Create release
    runs-on: ubuntu-latest

    steps:
      - uses: agrc/release-composite-action@dev
        with:
          create-major-minor-tags: true
          prerelease: ${{ github.ref_name == 'dev' }}
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          github-app-id: ${{ secrets.UGRC_RELEASE_BOT_APP_ID }}
          github-app-key: ${{ secrets.UGRC_RELEASE_BOT_APP_KEY }}
          github-app-name: ${{ secrets.UGRC_RELEASE_BOT_NAME }}
          github-app-email: ${{ secrets.UGRC_RELEASE_BOT_EMAIL }}
```
