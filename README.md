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

const content_with_header_and_img = `
![alt](http://yo.io/)

content1

content2
## header2`;

getContent(content_with_header_and_img).html

// <p><img src="http://yo.io/" alt="alt"></p>
// <p>content1</p>
// <p>content2</p>
// <h2>header2</h2>

```

## API

### getContent(input)

#### input

*Required*  
Type: `String`

Markdown string.

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
