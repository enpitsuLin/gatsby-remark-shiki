import { FontStyle, IThemedToken } from "shiki";
import { createElement, render } from "./h";

export interface HtmlRendererOptions {
  langId?: string;
  fg?: string;
  bg?: string;
}

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const bg = options.bg || "#fff";

  let vnode = createElement(
    "pre",
    {
      className: "shiki",
      style: `background-color: ${bg};padding: 0.75rem;border-radius: 0.25rem;position: relative;`
    },
    createElement(
      "div",
      {
        className: "language-id",
        style:
          "position: absolute;right: 0;top: 0;color:#eee;background-color: #393939;padding: 0.125rem 0.425rem;border-radius: 0.125rem;"
      },
      `${options.langId}`
    ),
    createElement(
      "code",
      { className: "shiki-code" },
      ...lines.map((l: IThemedToken[]) => {
        return createElement(
          "div",
          { className: "shiki-line" },
          ...l.map((token) => {
            const cssDeclarations = [`color: ${token.color || options.fg}`];
            if (token.fontStyle & FontStyle.Italic) {
              cssDeclarations.push("font-style: italic");
            }
            if (token.fontStyle & FontStyle.Bold) {
              cssDeclarations.push("font-weight: bold");
            }
            if (token.fontStyle & FontStyle.Underline) {
              cssDeclarations.push("text-decoration: underline");
            }
            return createElement("span", { style: cssDeclarations.join(";") }, escapeHtml(token.content));
          })
        );
      })
    )
  );

  return render(vnode);
}

const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

function escapeHtml(html: string) {
  return html.replace(/[&<>"']/g, (chr) => htmlEscapes[chr]);
}
