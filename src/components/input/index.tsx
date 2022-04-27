import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { FC } from "react";

type InputProps = {} & InputHTMLAttributes<any>;
const Input: FC<InputProps> = ({ className, ...rest }) => {
  const inputClass = classNames(className, "w-full mt-1");
  return <input type="text" className={inputClass} {...rest} />;
};
export default Input;
