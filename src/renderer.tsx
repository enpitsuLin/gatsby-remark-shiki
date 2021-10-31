import React from "react";
import { renderToString } from "react-dom/server";
import { FontStyle, IThemedToken } from "shiki";

export interface HtmlRendererOptions {
  langId?: string;
  fg?: string;
  bg?: string;
}

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const bg = options.bg || "#fff";
  let node = (
    <pre
      className="shiki"
      style={{ backgroundColor: bg, padding: "0.75rem", borderRadius: "0.25rem", position: "relative" }}
    >
      <div
        className="language-id"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          color: "#eee",
          backgroundColor: "#393939",
          padding: "0.125rem 0.425rem",
          borderRadius: "0.125rem"
        }}
      >
        {options.langId}
      </div>
      <code className="shiki-code">
        {lines.map((l: IThemedToken[]) => (
          <div key={l.toString()} className="shiki-line">
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

  return renderToString(node);
}
