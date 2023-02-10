[![npm version](https://badge.fury.io/js/textlint-plugin-org.svg)](https://badge.fury.io/js/textlint-plugin-org)
[![Build](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml)
[![test](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/test.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/test.yml)
[![lint](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/lint.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/lint.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
# textlint-plugin-org

Add Org mode support for [textlint](https://github.com/textlint/textlint "textlint").

What is textlint plugin? Please see https://github.com/textlint/textlint/blob/master/docs/plugin.md

## Try run by Docker

```shell
$ docker run -v "$(pwd)":/work \
             -w /work \
             --rm -it ghcr.io/kijimad/textlint-plugin-org \
             textlint \
             --plugin org \
             --rule textlint-rule-preset-ja-technical-writing \
             *.org
```

## Install

```shell
$ npm install textlint-plugin-org
```

## Usage

Via `.textlintrc`(Recommended)
```json
{
    "plugins": [
        "org"
    ]
}
```

```shell
$ textlint test.org
```


Via CLI
```shell
$ textlint --plugin org test.org
```

## Test

```
$ npm run test
```

## Lint

```
$ npm run lint
```

## Release

```
$ npm run build
$ npm version patch
$ npm login
$ npm publish
```
