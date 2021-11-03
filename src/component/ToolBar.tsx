import React, { CSSProperties } from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  Language?: React.ComponentType;
  CopyButton?: React.ComponentType;
}

const ToolBar: React.FC<Props> = (props) => {
  const { Language, CopyButton } = props;
  return (
    <div className="toolbar" style={defaultToolbarStyle}>
      {Language && <Language />}
      {CopyButton && <CopyButton />}
    </div>
  );
};

const defaultToolbarStyle: CSSProperties = {
  display: "flex",
  position: "absolute",
  right: 0,
  color: "#eee",
  backgroundColor: "#393939aa",
  padding: "0.125rem 0.425rem",
  borderRadius: "0.125rem"
};

export default ToolBar;
