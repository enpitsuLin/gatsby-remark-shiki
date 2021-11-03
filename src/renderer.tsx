import React, { createContext } from "react";
import { renderToString } from "react-dom/server";
import { IThemedToken } from "shiki";
import CodeBlock from "./component/CodeBlock";
import CopyButton from "./component/CopyButton";

export interface HtmlRendererOptions {
  classPrefix?: string;
  langId?: string;
  /** foreground color */
  fg?: string;
  /** background color */
  bg?: string;
}
export const OptionsContext = createContext<HtmlRendererOptions>({});

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const { bg = "#fff", fg = "#000", langId = "", classPrefix } = options;
  const randomId = Math.floor(Math.random() * 65535);

  const node = (
    <OptionsContext.Provider value={options}>
      <div className={classPrefix}>
        <div className={`${classPrefix}-toolbar`}>
          <div className={`${classPrefix}-language-id`}>{langId}</div>
          <CopyButton copyDataId={randomId} />
        </div>

        <CodeBlock
          dataId={randomId}
          lines={lines}
          className={`${classPrefix}${langId}`}
          style={{ backgroundColor: bg, color: fg }}
        />
      </div>
    </OptionsContext.Provider>
  );
  return renderToString(node);
}
