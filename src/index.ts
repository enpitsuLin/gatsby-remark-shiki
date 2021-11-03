import visit from "unist-util-visit";
import { getHighlighter, Theme, Lang, BUNDLED_LANGUAGES } from "shiki";
import { Node } from "unist";
import { renderToHtml } from "./renderer";

export interface Options {
  theme: Theme;
  classPrefix: string;
  aliases: {
    [lang: string]: Lang;
  };
  langId: boolean | { show: boolean; component?: React.ComponentType };
}

export interface RemarkNode extends Node {
  type: string;
  value: string;
  lang: string;
  children: Node[];
}

export default async (
  { markdownAST }: any,
  { theme = "nord", classPrefix = "language-", aliases = {}, langId = true }: Options
) => {
  /**
   * get aliases language name
   */
  function getLang(lang: string): Lang {
    const ret = lang?.toLowerCase() as Lang;
    return aliases[lang] || ret || undefined;
  }

  const highlighter = await getHighlighter({ theme, langs: [...BUNDLED_LANGUAGES] });
  const { fg, bg } = highlighter.getTheme(theme);

  visit(markdownAST, `code`, (node: RemarkNode) => {
    const code = node.value;

    const token = highlighter.codeToThemedTokens(code, getLang(node.lang), theme);

    node.type = "html";
    node.children = undefined;
    if (!node.lang) {
      node.value = `<pre class="shiki-unknown"><code>${code}</code></pre>`;
    }
    // langId for before alias
    node.value = renderToHtml(token, { langId: langId ? node.lang : null, fg, bg, classPrefix });
  });
};
