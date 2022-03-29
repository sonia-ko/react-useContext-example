import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { isValid, htmlFor, label, type, value, onChange, onBlur } = props;

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    };
  });
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={htmlFor}> {label} </label>
      <input
        ref={inputRef}
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

export default Input;
