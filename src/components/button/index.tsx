import React, { ButtonHTMLAttributes } from "react";
import { PropsWithChildren } from "react";
import { FC } from "react";
import classNames from "classnames";
import "./index.less";

type ButtonProps = {
  type?: "default" | "primary" | "secondary" | "dashed" | "text" | "outline";
  disable?: boolean;
  size?: "mini" | "small" | "normal" | "large" | "largest";
} & Omit<ButtonHTMLAttributes<any>, "type"> &
  PropsWithChildren<unknown>;
const Button: FC<ButtonProps> = ({
  type = "default",
  className,
  disable = false,
  onClick,
  children,
  size = "normal",
  ...rest
}) => {
  const btnClass = classNames("ks-button h-8 px-6 text-base", className, {
    "ks-button-primary": type === "primary",
    "ks-button-disable": disable,
    "h-10 px-8 text-lg": size === "large",
    "h-12 px-10 text-xl": size === "largest",
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
