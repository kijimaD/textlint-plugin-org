[![npm version](https://badge.fury.io/js/textlint-plugin-org.svg)](https://badge.fury.io/js/textlint-plugin-org)
[![Build](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
# textlint-plugin-org

Add Org mode support for [textlint](https://github.com/textlint/textlint "textlint").

What is textlint plugin? Please see https://github.com/textlint/textlint/blob/master/docs/plugin.md

## Install

```shell
$ npm install textlint-plugin-org
```

## Usage

Manually add text plugin to do following:

```json
{
    "plugins": [
        "org"
    ]
}
```

Lint Org file with textlint

```shell
$ textlint test.org
```

## Build

```
$ yarn
```

## Tests

```
$ npm run test
```

## Lint

```
$ npm run lint
```
