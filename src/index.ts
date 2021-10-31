import visit from "unist-util-visit";
import { getHighlighter, Theme, Lang } from "shiki";
import { Node } from "unist";
import { renderToHtml } from "./renderer";

export interface Options {
  theme: Theme;
  classPrefix: string;
}

export interface RemarkNode extends Node {
  type: string;
  value: string;
  lang: string;
  children: Node[];
}

export default async ({ markdownAST }: any, { theme = "nord", classPrefix = "language-" }: Options) => {
  const highlighter = await getHighlighter({ theme });

  visit(markdownAST, `code`, (node: RemarkNode) => {
    node.type = "html";
    node.children = undefined;
    const token = highlighter.codeToThemedTokens(node.value, node.lang as Lang, theme, { includeExplanation: true });
    if (!node.lang) {
      node.value = `<pre class="${classPrefix}unknown"><code>${node.value}</code></pre>`;
    }
    const _theme = highlighter.getTheme(theme);
    node.value = renderToHtml(token, {
      langId: node.lang,
      fg: _theme.fg,
      bg: _theme.bg
    });
  });
};
