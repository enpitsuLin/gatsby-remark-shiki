import { visit } from "unist-util-visit";

export default ({ markdownAST }, option = {}) => {
  visit(markdownAST, `code`, (node) => {});
};
