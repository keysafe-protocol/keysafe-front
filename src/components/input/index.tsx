import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { FC } from "react";

type InputProps = {} & InputHTMLAttributes<any>;
const Input: FC<InputProps> = ({ className, ...rest }) => {
  const inputClass = classNames(
    className,
    "border border-gray-700 rounded w-full px-2 py-1"
  );
  return <input className={inputClass} {...rest} />;
};
export default Input;
