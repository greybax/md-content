import { equal } from 'assert';
import expect from 'expect';
import { isHeader } from 'commonmark-helpers';
import getContent from './index';

const basic = `
# header
20 December 2012

content
with two paragraphs`

const content_with_header_and_img = `
![alt](http://yo.io/)

content1

content2
## header2`;

const table = `
|header1|header2|
|-------|-------|
| col1  | col2  |`;

const strikethrough = `
~~text~~`;

it('should getContent with img and h2', () =>
  equal(getContent(content_with_header_and_img).html,
`<p><img src="http://yo.io/" alt="alt"></p>
<p>content1</p>
<p>content2</p>
<h2>header2</h2>
`));

it('should getContent with <table> html tag', () =>
  expect(getContent(table).html).toInclude('<table>'));

it('should getContent with <del> html tag', () =>
  expect(getContent(strikethrough).html).toInclude('<del>'));