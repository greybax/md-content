import markdown from 'remark-parse';
import remark from 'remark';
import html from 'remark-html';

export default (input) => {
  let mdast = remark().use(markdown).process(input);
  return {
    html: remark().use(html).process(mdast)
  };
};