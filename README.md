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
          release-bot-app-id: ${{ secrets.UGRC_RELEASE_BOT_APP_ID }}
          release-bot-app-key: ${{ secrets.UGRC_RELEASE_BOT_APP_KEY }}
          release-bot-name: ${{ secrets.UGRC_RELEASE_NAME }}
          release-bot-email: ${{ secrets.UGRC_RELEASE_EMAIL }}
```
