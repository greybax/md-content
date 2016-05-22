# md-content

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> get content from markdown article

## Install

    npm install --save md-content

## Usage

```js
import getContent from 'md-content';

const isHeader = node => node.type === 'Header'; // small helper function

const simple = `
# header

content`;

// simple get content without header
getContent(simple, ['header']).text); // content
getContent(simple, [/header/]).text); // content
getContent(simple, [isHeader]).text); // content

const basic = `
# header
20 December 2012

content
with two paragraphs`;

// basic get content without header and date
getContent(basic, [/header/, /december/gim]).text; // content\nwith two paragraphs
```

## API

### getContent(input, removeList)

#### input

*Required*  
Type: `String`

Markdown string.

#### removeList

Type: `Array` of `Function || RegExp || String`  
Default: `[]`

Matched nodes will be removed.  
`String` or `RegExp` will be matched against plaintext markdown nodes.  
`Function` takes commonmark `node` as a first param, and ast iteration `event` as a second param. Check out [commonmark-helpers shortcuts](https://www.npmjs.com/package/commonmark-helpers#bunch-of-shortcut-helpers) and [commonmark api](https://github.com/jgm/commonmark.js#usage)

## License

MIT © [Aleksandr Filatov](https://alfilatov.com)

[npm-url]: https://npmjs.org/package/md-content
[npm-image]: https://img.shields.io/npm/v/md-content.svg?style=flat-square

[travis-url]: https://travis-ci.org/greybax/md-content
[travis-image]: https://img.shields.io/travis/greybax/md-content.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/greybax/md-content
[coveralls-image]: https://img.shields.io/coveralls/greybax/md-content.svg?style=flat-square

[depstat-url]: https://david-dm.org/greybax/md-content
[depstat-image]: https://david-dm.org/greybax/md-content.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/greybax/md-content
[depstat-dev-image]: https://david-dm.org/greybax/md-content/dev-status.svg?style=flat-square
