import { equal } from 'assert';
import expect from 'expect';
import getContent from './index';

const basic_italicized_date = `
# header
_20 June 2016_

content

with two paragraphs`

const content_with_header_and_img = `
# header
20 June 2016

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

it('should getContent(basic_italicized_date) html without header and date', () =>
  equal(getContent(basic_italicized_date).html,
`<p>content</p>
<p>with two paragraphs</p>
`));

it('should getContent(basic_italicized_date) plain text ', () =>
  equal(getContent(basic_italicized_date).text,
`content
with two paragraphs`
));

it('should getContent(content_with_header_and_img) html with img and h2', () =>
  equal(getContent(content_with_header_and_img).html,
`<p><img src="http://yo.io/" alt="alt"></p>
<p>content1</p>
<p>content2</p>
<h2>header2</h2>
`));

it('should getContent(content_with_header_and_img) plain text', () =>
  equal(getContent(content_with_header_and_img).text,
`content1
content2
header2`));

it('should getContent(table) with <table> html tag', () =>
  expect(getContent(table).html).toMatch(/<table>/));

it('should getContent(strikethrough) with <del> html tag', () =>
  expect(getContent(strikethrough).html).toMatch(/<del>/));