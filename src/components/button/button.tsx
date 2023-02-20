import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
} from "react";
import classNames from "classnames";
import styles from "./button.module.css";

type ButtonAttributes = ButtonHTMLAttributes<typeof Button>;
export type Theme = "default" | "green" | "purple" | "yellow";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  theme?: Theme;
  type?: ButtonAttributes["type"];
  disabled?: ButtonAttributes["disabled"];
  rounded?: boolean;
  onDisabledClick?: MouseEventHandler;
  [x: string]: any;
};

export default function Button({
  className,
  children,
  type = "button",
  theme = "default",
  rounded,
  onDisabledClick,
  ...props
}: Props): ReactElement {
  const classes = classNames(
    styles.button,
    className,
    styles[theme],
    rounded && styles.rounded
  );

  const handleSpanClick: MouseEventHandler = (ev) => {
    if (props.disabled) onDisabledClick?.(ev);
  };

  return (
    <button className={classes} type={type} {...props}>
      <span onClick={handleSpanClick}>{children}</span>
    </button>
  );
}
