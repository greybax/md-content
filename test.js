import { equal } from 'assert';
import expect from 'expect';
import { isHeader } from 'commonmark-helpers';
import getContent from './index';

const simple = `
# header
content`;

it('should getContent with String', () =>
  equal(getContent(simple, ['header']).text, 'content'));

it('should getContent with RexExp', () =>
  equal(getContent(simple, [/header/]).text, 'content'));

it('should getContent with commonmark Matcher', () =>
  equal(getContent(simple, [isHeader]).text, 'content'));

const basic = `
# header
20 December 2012

content
with two paragraphs`

const table = `
|header1|header2|
|-------|-------|
| col1  | col2  |`;

const strikethrough = `
~~text~~`;

it('should getContent combo list', () =>
  equal(getContent(basic, [isHeader, /december/gim]).text, 'content\nwith two paragraphs'));

it('should getContent empty list', () =>
  equal(getContent('content').text, 'content'));

it('should getContent with <table> html tag', () =>
  expect(getContent(table).html).toInclude('<table>'));

it('should getContent with <del> html tag', () =>
  expect(getContent(strikethrough).html).toInclude('<del>'));