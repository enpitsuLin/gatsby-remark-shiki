import React from "react";
import { renderToString } from "react-dom/server";
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

export const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M16 1H2v16h2V3h12V1zm-1 4l6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z" />
  </svg>
);

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const { bg = "#fff", langId = "", classPrefix } = options;
  const randomId = Math.floor(Math.random() * 65535);
  let node = (
    <pre className={`${classPrefix}${langId}`} style={defaultPreStyle(bg)}>
      {langId && (
        <div className="language-id" style={defaultLangIdStyle}>
          {langId}
          <button className="copy-btn" data-clipboard-target={`#code-${randomId}`}>
            <CopyIcon />
          </button>
        </div>
      )}
      <code className="code" id={`code-${randomId}`}>
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

  return renderToString(node);
}
