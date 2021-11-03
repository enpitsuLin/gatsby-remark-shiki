import React from "react";

interface Prop {
  langId: string;
}

const LanguageId: React.FC<Prop> = (props) => {
  const { langId, ...attr } = props;
  return (
    <div className="language-id" {...attr}>
      {langId}
    </div>
  );
};

export default LanguageId;
