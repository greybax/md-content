var remarkAbstract = require("remark");
var html = require("remark-html");
var moment = require("moment");
var striptags = require("striptags");
var remark = remarkAbstract();

// TODO: Need to move it to helper functions
const isHeader = (node) => {
    return node.type === "heading" && node.depth === 1;
}
const isDate = (format, locale, node) => {
    let date = node.children[0].value
        ? node.children[0].value
        : node.children[0].children 
            ? node.children[0].children[0].value
            : node.children[0].value;
    return moment(date, format, locale, true).isValid();
}

export default (input, removeList = []) => {
    let remark = remarkAbstract();
    let ast = remark.parse(input);
    var astChild = ast.children;

    let clonedAst = { type: "root", children: [] };

    for (let i = 0; i < astChild.length; i++) {
        if (isHeader(astChild[i]) || isDate('DD MMMM YYYY', 'en', astChild[i])) {
            continue;
        }
        clonedAst.children.push(astChild[i]);
    }

    let md = remark.stringify(clonedAst);
    let dom = remark.use(html).process(md).contents;
    return {
        text: striptags(dom).trim(),
        html: dom,
        clonedAst
    };
};