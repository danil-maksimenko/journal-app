import "./Button.css";
import { memo } from "react";
import cn from "classnames";

function Button({
  children,
  onClick,
  appearance = "accent",
  disabled = false,
}) {
  return (
    <button
      className={cn("button", {
        accent: appearance === "accent",
        secondary: appearance === "secondary",
        disabled: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default memo(Button);
