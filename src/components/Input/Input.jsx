import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
  { isValid, appearence = "text", className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(className, {
        [styles["invalid"]]: isValid,
        [styles["input"]]: appearence == "text",
        [styles["input-date"]]: appearence == "date",
      })}
      {...props}
    />
  );
});

export default Input;
