import React, { useEffect, useMemo, useState } from "react";
import shuffle from "lodash/shuffle";
import Flag from "react-world-flags";

import styles from "./hello.module.css";

type HelloPerCountry = {
  code: string;
  text: string;
};

const helloInOtherLanguages = Object.entries({
  BGR: "Здравей",
  ESP: "Hola",
  CZE: "Dobrý den",
  DNK: "Hej",
  GRC: "Καλημέρα",
  FIN: "Hei",
  ISR: "שלום",
  IND: "नमस्ते।",
  HRV: "Bok",
  HUN: "Jó napot",
  IDN: "Halo",
  ITA: "Salve",
  LTU: "Laba diena",
  LVA: "Sveiks",
  NOR: "Hei",
  NLD: "Hallo",
  POL: "Dzień dobry",
  PRT: "Olá",
  ROU: "Bună",
  SVK: "Ahoj",
  SWE: "Hej",
  THA: "สวัสดี",
  TUR: "Merhaba",
  UKR: "Вітаю",
  VNM: "Chào chị",
}).map(([code, text]) => ({ code, text })) as HelloPerCountry[];

const defaultHello: HelloPerCountry = { code: "GBR", text: "Hello" };

export const Hello = () => {
  const hellos = useMemo(
    () => [defaultHello, ...shuffle(helloInOtherLanguages)],
    []
  );
  const [hello, setHello] = useState<HelloPerCountry>(defaultHello);
  const [currentHelloIndex, setHelloIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHello(hellos[(currentHelloIndex + 1) % hellos.length]);
      setHelloIndex(currentHelloIndex + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentHelloIndex, setHello, hellos]);

  return (
    <strong className={styles.hello}>
      <Flag code={hello.code} height="18" /> {hello.text} 👋
    </strong>
  );
};
