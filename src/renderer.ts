import { FontStyle, IThemedToken } from "shiki";

export interface HtmlRendererOptions {
  langId?: string;
  fg?: string;
  bg?: string;
}

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const bg = options.bg || "#fff";

  let html = "";

  html += `<pre class="shiki" style="background-color: ${bg};padding: 0.75rem;border-radius: 0.25rem;position: relative;">`;
  if (options.langId) {
    html += `<div class="language-id" style="position: absolute;right: 0;top: 0;color:#eee;background-color: #393939;padding: 0.125rem 0.425rem;border-radius: 0.125rem;">${options.langId}</div>`;
  }
  html += `<code class="code">`;

  lines.forEach((l: IThemedToken[]) => {
    html += `<span class="line">`;

    l.forEach((token) => {
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
      html += `<span style="${cssDeclarations.join("; ")}">${escapeHtml(token.content)}</span>`;
    });
    html += `</span>\n`;
  });
  html = html.replace(/\n*$/, ""); // Get rid of final new lines
  html += `</code></pre>`;

  return html;
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
