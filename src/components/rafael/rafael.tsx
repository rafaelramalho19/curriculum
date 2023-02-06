import Image from "next/image";
import React from "react";

import rafaelPicture from "@/../public/rafael-ramalho.png";

import styles from "./rafael.module.css";

export const Rafael = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topBackground} />
      <Image className={styles.image} src={rafaelPicture} width="600" alt="" />
      <div className={styles.bottomBackground} />
    </div>
  );
};
