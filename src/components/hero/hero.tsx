import React from "react";
import { Hello } from "../hello";
import { Rafael } from "../rafael";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic", "greek", "vietnamese"] });

import styles from "./hero.module.css";
import classNames from "classnames";

export const Hero = () => {
  return (
    <div className={styles.container}>
      <h2 className={classNames(styles.title, inter.className)}>
        <Hello />
        <br />
        My name is Rafael Ramalho
      </h2>
      <Rafael />
    </div>
  );
};
