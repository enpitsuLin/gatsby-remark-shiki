import React from "react";

interface Props {
  copyDataId: number;
}
const CopyButton: React.FC<Props> = ({ copyDataId }) => {
  return (
    <div className="copy-button" style={{ marginLeft: "0.45rem" }}>
      <button className="copy-btn" data-clipboard-target={`#code-${copyDataId}`}>
        copy
      </button>
    </div>
  );
};

export default CopyButton;
