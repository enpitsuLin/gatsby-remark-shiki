import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FontStyle, IThemedToken } from "shiki";

export interface HtmlRendererOptions {
  langId?: string;
  fg?: string;
  bg?: string;
  classPrefix?: string;
}

const defaultPreStyle = (bg): React.CSSProperties => ({
  backgroundColor: bg,
  padding: "0.75rem",
  borderRadius: "0.25rem",
  position: "relative"
});

const defaultLangIdStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: 0,
  color: "#eee",
  backgroundColor: "#393939",
  padding: "0.125rem 0.425rem",
  borderRadius: "0.125rem"
};

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const { bg = "#fff", langId = "", classPrefix } = options;
  let node = (
    <pre className={`${classPrefix}${langId}`} style={defaultPreStyle(bg)}>
      {langId && (
        <div className="language-id" style={defaultLangIdStyle}>
          {langId}
        </div>
      )}
      <code className="code">
        {lines.map((l: IThemedToken[]) => (
          <div key={l.toString()} className="line">
            {l.map((token) => {
              const cssDeclarations: React.CSSProperties = { color: token.color || options.fg };
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
  );

  return renderToStaticMarkup(node);
}
