import React, { useState } from "react";
import { Hello } from "../hello";
import { Colors, Rafael } from "../rafael";
import styles from "./hero.module.css";
import classNames from "classnames";
import { currentCompany } from "@/constants/companies";
import Flag from "react-world-flags";
import Button from "@/components/button";

export const Hero = () => {
  const [activeColor, setActiveColor] = useState<Colors>(undefined);

  const getButtonProps = (color: Colors) => ({
    theme: color,
    onMouseEnter: () => setActiveColor(color),
    onMouseLeave: () => setActiveColor(undefined),
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Hello />
        <br />
        <p className={styles.description}>My name is Rafael Ramalho.</p>
        <p className={styles.description}>
          Front-end Developer, working remotely for{" "}
          <strong>{currentCompany.name}</strong> from Spain{" "}
          <Flag
            className={styles.flag}
            alt="spain flag"
            code="ESP"
            height="20"
          />
        </p>
      </h2>

      <Rafael activeColor={activeColor} />

      <div className={styles.actions}>
        <Button {...getButtonProps("green")}>Past Companies</Button>
        <Button {...getButtonProps("purple")}>Skill Sets</Button>
        <Button {...getButtonProps("yellow")}>Contact</Button>
      </div>
    </div>
  );
};
