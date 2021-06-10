[![npm version](https://badge.fury.io/js/textlint-plugin-org.svg)](https://badge.fury.io/js/textlint-plugin-org)
[![Build](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/build.yml)
[![test](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/test.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/test.yml)
[![lint](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/lint.yml/badge.svg)](https://github.com/kijimaD/textlint-plugin-org/actions/workflows/lint.yml)
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

## TODO

- Heavy dependency
- Old package warnings

## Tests

```
$ npm run test
```

## Lint

```
$ npm run lint
```
