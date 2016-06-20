var remarkAbstract = require("remark");
var html = require("remark-html");
var moment = require("moment");
var remark = remarkAbstract();

// TODO: Need to move it to helper functions
const isHeader = (node) => {
    return node.type === "heading" && node.depth === 1;
}
const isDate = (format, locale, node) =>
    moment(node, format, locale, true).isValid();

export default (input, removeList = []) => {
    let remark = remarkAbstract();
    let ast = remark.parse(input);
    var astChild = ast.children;

    let clonedAst = { type: "root", children: [] };

    for (let i = 0; i < astChild.length; i++) {
        if (isHeader(astChild[i]) || isDate('DD MMMM YYYY', 'en', astChild[i].children[0].value)) {
            continue;
        }
        clonedAst.children.push(astChild[i]);
    }

    let md = remark.stringify(clonedAst);
    return {
        //text: text(node),
        html: remark.use(html).process(md).contents,
        clonedAst
    };
};