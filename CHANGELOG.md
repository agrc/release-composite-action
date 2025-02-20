# Changelog

## [1.2.8](https://github.com/agrc/release-composite-action/compare/v1.2.7...v1.2.8) (2025-01-22)


### Documentation

* update major with regard to scopes ([cf2b1f5](https://github.com/agrc/release-composite-action/commit/cf2b1f5d220902d0e0f064ec35477362522b3281))

## [1.2.7](https://github.com/agrc/release-composite-action/compare/v1.2.6...v1.2.7) (2024-10-07)


### Documentation

* add multi-file example to extra-files ([3217c69](https://github.com/agrc/release-composite-action/commit/3217c690a4d4795a25d0ef87217f351a29a46337))

## [1.2.6](https://github.com/agrc/release-composite-action/compare/v1.2.5...v1.2.6) (2024-10-03)


### Documentation

* add section about the extra files input ([dec71ea](https://github.com/agrc/release-composite-action/commit/dec71ea2a507061d9113655737da6a608f782495))

## [1.2.5](https://github.com/agrc/release-composite-action/compare/v1.2.4...v1.2.5) (2024-09-26)


### Bug Fixes

* pin release-please to a major version ([4de60c4](https://github.com/agrc/release-composite-action/commit/4de60c4226c66fbad85f76f3f6670a961992f070))
* switch back to main release-please project ([bea89a5](https://github.com/agrc/release-composite-action/commit/bea89a559fb4d4dbb983bcec71849a33088dab30)), closes [#109](https://github.com/agrc/release-composite-action/issues/109)


### Documentation

* add note about forcing a specific version ([66a1c50](https://github.com/agrc/release-composite-action/commit/66a1c5072cd7a7665c89af27f00f7a9c66b87f21))
* add usage details about writing commits ([37326ff](https://github.com/agrc/release-composite-action/commit/37326ff5dc0157576e2529f159f34f35c3657ccc))

## [1.2.4](https://github.com/agrc/release-composite-action/compare/v1.2.3...v1.2.4) (2024-07-10)


### Dependencies

* bump action to remove node warning ([e5a5de3](https://github.com/agrc/release-composite-action/commit/e5a5de37310174f754ebf7af0194f600cba962e4))

## [1.2.3](https://github.com/agrc/release-composite-action/compare/v1.2.2...v1.2.3) (2024-07-10)


### Bug Fixes

* better logic for determining if the run was triggered by a release pr ([8193c5c](https://github.com/agrc/release-composite-action/commit/8193c5cfeac3806051e528da51e64d6c67cd5791))

## [1.2.2](https://github.com/agrc/release-composite-action/compare/v1.2.1...v1.2.2) (2024-07-08)


### Features

* add release notifications ([eb50d22](https://github.com/agrc/release-composite-action/commit/eb50d22d72cad948cf513391cde1db72bff671b4)), closes [#78](https://github.com/agrc/release-composite-action/issues/78)


### Bug Fixes

* fix bash if statement ([d34aafc](https://github.com/agrc/release-composite-action/commit/d34aafcef288dff13f2654adf178a8250646355f))
* make is release pr take into account prerelease input ([1da9bfa](https://github.com/agrc/release-composite-action/commit/1da9bfa0165f28607935b4f3fd3e5be894afcde9)), closes [#88](https://github.com/agrc/release-composite-action/issues/88)
* only define release_created output if it is true ([2bb63c2](https://github.com/agrc/release-composite-action/commit/2bb63c24d20ee8b7c04c4bd4f5fe85f5e8e319f7))

## [1.2.2-1](https://github.com/agrc/release-composite-action/compare/v1.2.1...v1.2.2-1) (2024-07-08)


### Features

* add release notifications ([eb50d22](https://github.com/agrc/release-composite-action/commit/eb50d22d72cad948cf513391cde1db72bff671b4)), closes [#78](https://github.com/agrc/release-composite-action/issues/78)


### Bug Fixes

* make is release pr take into account prerelease input ([a10fa0c](https://github.com/agrc/release-composite-action/commit/a10fa0c40f1eb0264d3632bd039827c5f87e2724)), closes [#88](https://github.com/agrc/release-composite-action/issues/88)
* only define release_created output if it is true ([2bb63c2](https://github.com/agrc/release-composite-action/commit/2bb63c24d20ee8b7c04c4bd4f5fe85f5e8e319f7))

## [1.2.2-0](https://github.com/agrc/release-composite-action/compare/v1.2.1...v1.2.2-0) (2024-07-08)


### Features

* add release notifications ([eb50d22](https://github.com/agrc/release-composite-action/commit/eb50d22d72cad948cf513391cde1db72bff671b4)), closes [#78](https://github.com/agrc/release-composite-action/issues/78)


### Bug Fixes

* only define release_created output if it is true ([c8deb73](https://github.com/agrc/release-composite-action/commit/c8deb738831b38a87a7f879118e46e541847a669))

## [1.2.1](https://github.com/agrc/release-composite-action/compare/v1.2.1-0...v1.2.1) (2024-06-27)


### Bug Fixes

* get major/minor values from get-next-version ([a05301d](https://github.com/agrc/release-composite-action/commit/a05301de8df63f45e7784d55a6be7781b9992186))

## [1.2.1-0](https://github.com/agrc/release-composite-action/compare/v1.2.0...v1.2.1-0) (2024-06-27)


### Bug Fixes

* fix duplicate step ids ([29605a9](https://github.com/agrc/release-composite-action/commit/29605a90d88e80a13a864bf3c5e4c5746cc60df5))
* remove header ([e616ebf](https://github.com/agrc/release-composite-action/commit/e616ebfb592c81f17c6142ad80e0320448fe7e4a))
* switch to forked version of release-please ([0633e59](https://github.com/agrc/release-composite-action/commit/0633e59cf24fe431ae202a39ec78d2bf9ef70bcc))
* switch to release please cli rather than action ([7d288ef](https://github.com/agrc/release-composite-action/commit/7d288efb73cb48335f2b852c04c125adf0367c0b)), closes [#48](https://github.com/agrc/release-composite-action/issues/48)
* upgrade to release please action v4 config file requirements ([69db3de](https://github.com/agrc/release-composite-action/commit/69db3de69c17627d0bab16b53a0688fa75055358)), closes [#48](https://github.com/agrc/release-composite-action/issues/48)
* use ugrc release bot for release config commit ([db9daa7](https://github.com/agrc/release-composite-action/commit/db9daa75eab4f11669ba10a7ebcf5fada46ce581))


### Documentation

* better concurrency group example ([232cae2](https://github.com/agrc/release-composite-action/commit/232cae2c7881e4e9b896f114d068dad825cb1e9b))
* better concurrency group example ([2b0626a](https://github.com/agrc/release-composite-action/commit/2b0626aaef5e0efd4b9a695db8d8c06d708b7669))
* clarify why we need the repo-token input ([20c2468](https://github.com/agrc/release-composite-action/commit/20c24683b8aecd6778a962f5d039e60e410d1e7c))

## [1.2.0](https://github.com/agrc/release-composite-action/compare/v1.1.7...v1.2.0) (2023-02-27)


### 🚀 Features

* add extra-files parameter ([49739a4](https://github.com/agrc/release-composite-action/commit/49739a41e39335cdab545ba1eb4fd0a2a8990a77))

## [1.1.7](https://github.com/agrc/release-composite-action/compare/v1.1.6...v1.1.7) (2022-10-04)


### 🐛 Bug Fixes

* remove git stuff because we're not smart enough to use it ([6cd8715](https://github.com/agrc/release-composite-action/commit/6cd87158f922b8a0b6d789bdedacf6e4bca27e99))

## [1.1.6](https://github.com/agrc/release-composite-action/compare/v1.1.5...v1.1.6) (2022-10-04)


### 🐛 Bug Fixes

* add some prunes ([c9d7543](https://github.com/agrc/release-composite-action/commit/c9d7543d8672bc8c62f92df921be6d45a6bc9cdc))
* pull again ([77a1c9c](https://github.com/agrc/release-composite-action/commit/77a1c9c5750e37c1b714788d0b5e9c2a354f2135))

## [1.1.5](https://github.com/agrc/release-composite-action/compare/v1.1.4...v1.1.5) (2022-10-04)


### 📖 Documentation Improvements

* add link to angular commit standard ([aeadd69](https://github.com/agrc/release-composite-action/commit/aeadd695932d82841c6a4879d8cb8395e4092742))


### 🐛 Bug Fixes

* fix rebase commands for bringing dev back up to date ([e829a60](https://github.com/agrc/release-composite-action/commit/e829a606de079ef6d6d9c0fe8751a2687bbafacf))

## [1.1.4](https://github.com/agrc/release-composite-action/compare/v1.1.3...v1.1.4) (2022-10-03)


### 🐛 Bug Fixes

* explicitily set upstream branch ([88b7f33](https://github.com/agrc/release-composite-action/commit/88b7f33dd8cc8b55811b7ff82ec4ecbc00ab78a7))

## [1.1.3](https://github.com/agrc/release-composite-action/compare/v1.1.2...v1.1.3) (2022-10-03)


### 🐛 Bug Fixes

* remove service now step ([0eabf70](https://github.com/agrc/release-composite-action/commit/0eabf708f4228e6cd008e52fbb7a1ff5d62b5c71))

## [1.1.2](https://github.com/agrc/release-composite-action/compare/v1.1.1...v1.1.2) (2022-10-03)


### 🐛 Bug Fixes

* pass all required params to service now action ([61f7ca5](https://github.com/agrc/release-composite-action/commit/61f7ca5a710a969509380343e6e093e161a96b5a))

## [1.1.1](https://github.com/agrc/release-composite-action/compare/v1.1.0...v1.1.1) (2022-09-30)


### 📖 Documentation Improvements

* point at v1 ([e7afd71](https://github.com/agrc/release-composite-action/commit/e7afd71a88e54812d56bdc17a1b4ace1e2bc8c04))

## [1.1.0](https://github.com/agrc/release-composite-action/compare/v1.0.7...v1.1.0) (2022-09-20)


### 📖 Documentation Improvements

* add service now secrets to the example ([11378bd](https://github.com/agrc/release-composite-action/commit/11378bded0168101866169369a4cb4350c36a67a))


### 🚀 Features

* add service now deployment notification job step ([6420543](https://github.com/agrc/release-composite-action/commit/6420543d9f1cb1f81070a7a0a66f171f0549a52b))


### 🐛 Bug Fixes

* add missing } ([768ed15](https://github.com/agrc/release-composite-action/commit/768ed1549026a1a7597ab6e3b5b443c1135fd5e6))

## [1.0.7](https://github.com/agrc/release-composite-action/compare/v1.0.6...v1.0.7) (2022-09-13)


### 🐛 Bug Fixes

* try to fix git commands ([a26a449](https://github.com/agrc/release-composite-action/commit/a26a449590a5fa55804a4dacd803d65a4d988628))


### 📖 Documentation Improvements

* add status badge ([2a9a767](https://github.com/agrc/release-composite-action/commit/2a9a767271f73150c55d4fee758359a0cd5e7b28))
* correct example ([2d0f6d9](https://github.com/agrc/release-composite-action/commit/2d0f6d916fedd8c5373bc6f542f459679a8fb41e))

## [1.0.7-0](https://github.com/agrc/release-composite-action/compare/v1.0.6...v1.0.7-0) (2022-09-13)


### 🐛 Bug Fixes

* try to fix git commands ([a26a449](https://github.com/agrc/release-composite-action/commit/a26a449590a5fa55804a4dacd803d65a4d988628))


### 📖 Documentation Improvements

* add status badge ([3642b13](https://github.com/agrc/release-composite-action/commit/3642b1348cad1e37e791b7c752c493ecbe71d436))
* correct example ([2d0f6d9](https://github.com/agrc/release-composite-action/commit/2d0f6d916fedd8c5373bc6f542f459679a8fb41e))

## [1.0.6](https://github.com/agrc/release-composite-action/compare/v1.0.5...v1.0.6) (2022-09-13)


### 🐛 Bug Fixes

* correct if branch to create tags ([5ebb61a](https://github.com/agrc/release-composite-action/commit/5ebb61a4b29591103259a1648c0a2f3c55181d06))

## [1.0.5](https://github.com/agrc/release-composite-action/compare/v1.0.4...v1.0.5) (2022-09-13)


### 🐛 Bug Fixes

* correct github commands ([8cfa63b](https://github.com/agrc/release-composite-action/commit/8cfa63b9a9a41b982f9a349c00e7a371d99e12a6))

## [1.0.4](https://github.com/agrc/release-composite-action/compare/v1.0.3...v1.0.4) (2022-09-13)


### 🐛 Bug Fixes

* correct context property name ([189be88](https://github.com/agrc/release-composite-action/commit/189be88a868e2ba402be5aff1aa26f78d093f176))
* correct git commands ([ba0002b](https://github.com/agrc/release-composite-action/commit/ba0002ba00b2e7f85e7dfa67433d8edc675a04d0))
* remove auto merge ([d359994](https://github.com/agrc/release-composite-action/commit/d359994dc513329b3ae865736deb7dbbd2792709))

## [1.0.3](https://github.com/agrc/release-composite-action/compare/v1.0.2...v1.0.3) (2022-09-13)


### 🐛 Bug Fixes

* remove step that can only run on pull_request trigger ([9fb9cd1](https://github.com/agrc/release-composite-action/commit/9fb9cd167de67eb91c038631cfa2ac7592cae34a))

## [1.0.2](https://github.com/agrc/release-composite-action/compare/v1.0.1...v1.0.2) (2022-09-12)


### 🐛 Bug Fixes

* only enable auto merge on pull request ([635c6e7](https://github.com/agrc/release-composite-action/commit/635c6e70cfd4ce908f8779bb9faab92e2bcc43a7))

## [1.0.1](https://github.com/agrc/release-composite-action/compare/v1.0.0...v1.0.1) (2022-09-12)


### 📖 Documentation Improvements

* show usage ([2212375](https://github.com/agrc/release-composite-action/commit/22123754d85aed0c78b7e0ace880abd30b883c68))

## 1.0.0 (2022-09-12)


### 🐛 Bug Fixes

* checkout code before using itself ([e75225f](https://github.com/agrc/release-composite-action/commit/e75225f2f84c775827884e899e18cb97205b3031))
* composite actions don't have access to secrets ([9219661](https://github.com/agrc/release-composite-action/commit/9219661da41ff66b455d976b8ad179271890de3e))
* point at v1 of get-next-version ([eae0e3d](https://github.com/agrc/release-composite-action/commit/eae0e3de01fb7da97b993951f5a5ef7a891478b9))
* simplify input names ([da02605](https://github.com/agrc/release-composite-action/commit/da02605b87715f7a01bf5fb2fc1c42e219a4b50c))


### 🚀 Features

* add release workflow ([e811a0c](https://github.com/agrc/release-composite-action/commit/e811a0c5c401328b659fbb323492fb5433b10399))
* add release-type input parameter ([0622a7d](https://github.com/agrc/release-composite-action/commit/0622a7d0d7116e1e9f64cd00ab290cc01366a369))
* enable auto-merge on release PRs ([fbada4e](https://github.com/agrc/release-composite-action/commit/fbada4e44194a67df6131f7ea582d53656edaa2e))
* keep dev in sync with main after release ([5a54aa6](https://github.com/agrc/release-composite-action/commit/5a54aa65174da6b231aafd473d99ed7bbe4f49bd))
