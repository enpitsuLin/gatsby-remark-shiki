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
  { theme = "nord", classPrefix = "shiki", aliases = {}, langId = true }: Options
) => {
  /**
   * get language name of aliases language name
   */
  function getLang(lang: string): Lang {
    const lowerCaseLang = lang?.toLowerCase();
    if (BUNDLED_LANGUAGES.map((item) => item.id).includes(lowerCaseLang)) {
      return lowerCaseLang as Lang;
    } else if (lowerCaseLang in aliases) {
      return aliases[lang];
    }
    return undefined;
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
    } else {
      // langId for before alias
      node.value = renderToHtml(token, { langId: node.lang, fg, bg, classPrefix });
    }
  });
};
