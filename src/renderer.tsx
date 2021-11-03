import React from "react";
import { renderToString } from "react-dom/server";
import { IThemedToken } from "shiki";
import CodeBlock from "./component/CodeBlock";
import CopyButton from "./component/CopyButton";
import LanguageId from "./component/LanguageId";
import ToolBar from "./component/ToolBar";

type CSSProperties = React.CSSProperties;

export interface HtmlRendererOptions {
  classPrefix?: string;
  langId?: string;
  fg?: string;
  bg?: string;
}

const defaultPreStyle = (bg, fg): CSSProperties => ({
  backgroundColor: bg,
  color: fg,
  padding: "0.75rem 0.75rem",
  borderRadius: "0.25rem",
  overflow: "auto"
});

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const { bg = "#fff", fg = "#000", langId = "", classPrefix } = options;
  const randomId = Math.floor(Math.random() * 65535);

  const node = (
    <div className="shiki" style={{ position: "relative", paddingTop: "0.75rem" }}>
      <ToolBar Language={LanguageId} CopyButton={CopyButton} />
      <CodeBlock
        dataId={randomId}
        lines={lines}
        className={`${classPrefix}${langId}`}
        style={defaultPreStyle(bg, fg)}
      />
    </div>
  );

  return renderToString(node);
}
