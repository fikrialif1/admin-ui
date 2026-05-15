import React from "react";

const CheckBox = (props) => {
  const { label, id, ...rest } = props;
  return (
    <>
      <input id={id} {...rest} />
      <label htmlFor={id} className="text-sm text-gray-01 ml-6">
        {label}
      </label>
    </>
  );
};

export default CheckBox;