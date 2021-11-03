import React, { CSSProperties } from "react";
import { FontStyle, IThemedToken } from "shiki";

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  lines: IThemedToken[][];
  dataId: number;
}

const CodeBlock: React.FC<Props> = (props) => {
  const { lines, dataId, ...attr } = props;
  return (
    <pre {...attr}>
      <code id={`code-${dataId}`}>
        {lines.map((l: IThemedToken[]) => (
          <div key={l.toString()} className="line">
            {l.map((token) => {
              const cssDeclarations: CSSProperties = {};
              if (token.color) cssDeclarations.color = token.color;
              if (token.fontStyle & FontStyle.Italic) cssDeclarations.fontStyle = "italic";
              if (token.fontStyle & FontStyle.Bold) cssDeclarations.fontWeight = "bold";
              if (token.fontStyle & FontStyle.Underline) cssDeclarations.textDecoration = "underline";
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
};

export default CodeBlock;
