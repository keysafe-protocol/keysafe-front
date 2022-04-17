import React, { ButtonHTMLAttributes } from "react";
import { PropsWithChildren } from "react";
import { FC } from "react";
import classNames from "classnames";
import "./index.less";

type ButtonProps = {
  type?: "default" | "primary" | "secondary" | "dashed" | "text" | "outline";
  disable?: boolean;
} & Omit<ButtonHTMLAttributes<any>, "type"> &
  PropsWithChildren<unknown>;
const Button: FC<ButtonProps> = ({
  type = "default",
  className,
  disable = false,
  onClick,
  children,
  ...rest
}) => {
  const btnClass = classNames("ks-button", className, {
    "ks-button-primary": type === "primary",
    "ks-button-disable": disable,
  });
  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disable) return;
    onClick && onClick(event);
  };
  return (
    <button className={btnClass} onClick={_onClick} {...rest}>
      {children}
    </button>
  );
};
export default Button;
