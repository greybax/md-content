import moment from "moment";
import { ast, text, html, isHeading, isParagraph, isText, isDepth, hasChildren } from "remark-helpers";

const isHeader = (node) => {
    return isHeading(node) && isDepth(node, 1);
}

const isTag = (node) => {
    return isParagraph(node)
        && hasChildren(node)
        && isText(node.children[0])
        && node.children[0].value.startsWith("#")
        && node.children[0].value.endsWith(";");
}

const isDate = (node) => {
    if (!node.value && !node.children) {
        return false;
    }

    if (node.value) {
        return moment(node.value).isValid();
    } else if (node.children) {
        return isDate(node.children[0]);
    }
}

export default (input) => {
    let mdast = ast(input).children;
    let clonedMdast = { type: "root", children: [] };

    for (let i = 0; i < mdast.length; i++) {
        if (isHeader(mdast[i]) || isDate(mdast[i]) || isTag(mdast[i])) {
            continue;
        }
        clonedMdast.children.push(mdast[i]);
    }

    return {
        text: text(clonedMdast),
        html: html(clonedMdast),
        clonedMdast
    };
};