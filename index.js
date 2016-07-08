var remark = require("remark");
var html = require("remark-html");
var moment = require("moment");
var striptags = require("striptags");

// TODO: Need to move it to helper functions
const isHeader = (node) => {
    return node.type === "heading" && node.depth === 1;
}

// TODO: Need to move it to helper functions
const isDate = (node) => {
    if (!node.value && !node.children) {
        return false;
    }
    
    if (node.value) {
        return moment(node.value).isValid();
    }
    else if (node.children) {
        return isDate(node.children[0]);
    }
}

export default (input) => {
    let ast = remark().parse(input).children;

    let clonedAst = { type: "root", children: [] };

    for (let i = 0; i < ast.length; i++) {
        if (isHeader(ast[i]) || isDate(ast[i])) {
            continue;
        }
        clonedAst.children.push(ast[i]);
    }

    let md = remark().stringify(clonedAst);
    let dom = remark().use(html).process(md).contents;
    return {
        text: striptags(dom).trim(),
        html: dom,
        clonedAst
    };
};