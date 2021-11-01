import render from "preact-render-to-string";
import { h } from "preact";
import { FontStyle, IThemedToken } from "shiki";
/** @jsx h */

export interface HtmlRendererOptions {
  langId?: string;
  fg?: string;
  bg?: string;
  classPrefix?: string;
}

const defaultPreStyle = (bg): h.JSX.CSSProperties => ({
  backgroundColor: bg,
  padding: "0.75rem 0.75rem",
  borderRadius: "0.25rem",
  overflow: "auto"
});

const defaultToolbarStyle: h.JSX.CSSProperties = {
  display: "flex",
  position: "absolute",
  right: 0,
  top: 0,
  color: "#eee",
  backgroundColor: "#393939aa",
  padding: "0.125rem 0.425rem",
  borderRadius: "0.125rem"
};

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const { bg = "#fff", langId = "", classPrefix } = options;
  const randomId = Math.floor(Math.random() * 65535);
  let node = (
    <div className="shiki" style={{ position: "relative", paddingTop: "0.75rem" }}>
      <div className="toolbar" style={defaultToolbarStyle}>
        {langId && (
          <div className="language-id" style={{}}>
            {langId}
          </div>
        )}
        <div className="copy-button" style={{ marginLeft: "0.45rem" }}>
          <button className="copy-btn" data-clipboard-target={`#code-${randomId}`}>
            copy
          </button>
        </div>
      </div>
      <pre className={`${classPrefix}${langId}`} style={defaultPreStyle(bg)}>
        <code className="code" id={`code-${randomId}`}>
          {lines.map((l: IThemedToken[]) => (
            <div key={l.toString()} className="line">
              {l.map((token) => {
                const cssDeclarations: h.JSX.CSSProperties = { color: token.color || options.fg };
                if (token.fontStyle & FontStyle.Italic) {
                  cssDeclarations.fontStyle = "italic";
                }
                if (token.fontStyle & FontStyle.Bold) {
                  cssDeclarations.fontWeight = "bold";
                }
                if (token.fontStyle & FontStyle.Underline) {
                  cssDeclarations.textDecoration = "underline";
                }
                return (
                  <span key={token.content} style={cssDeclarations}>
                    {token.content}
                  </span>
                );
              })}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );

  return render(node);
}
