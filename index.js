var remarkAbstract = require("remark");
var html = require("remark-html");
var moment = require("moment");
var striptags = require("striptags");
var remark = remarkAbstract();

// TODO: Need to move it to helper functions
const isHeader = (node) => {
    return node.type === "heading" && node.depth === 1;
}
const isDate = (node) => {
    if (node.value) {
        return moment(node.value).isValid();
    }
    else if (node.children) {
        return isDate(node.children[0]);
    }
}

export default (input, removeList = []) => {
    let remark = remarkAbstract();
    let ast = remark.parse(input);
    var astChild = ast.children;

    let clonedAst = { type: "root", children: [] };

    for (let i = 0; i < astChild.length; i++) {
        if (isHeader(astChild[i]) || isDate(astChild[i])) {
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