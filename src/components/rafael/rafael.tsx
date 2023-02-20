import Image from "next/image";
import React from "react";

import rafaelPicture from "@/../public/rafael-ramalho.png";

import styles from "./rafael.module.css";
import classNames from "classnames";

export type Colors = "green" | "purple" | "yellow" | undefined;

type Props = {
  activeColor?: Colors;
};

export const Rafael = ({ activeColor }: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.topBackground,
          activeColor && styles[activeColor]
        )}
      />
      <Image className={styles.image} src={rafaelPicture} width="600" alt="" />
      <div
        className={classNames(
          styles.bottomBackground,
          activeColor && styles[activeColor]
        )}
      />
    </div>
  );
};
