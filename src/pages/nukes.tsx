import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/nukes.module.css";
import { useEffect, useState } from "react";
import NukeIcon from "@/images/nuke";
import InactiveNukeIcon from "@/images/inactive-nuke";

const inter = Inter({ subsets: ["latin"] });

const ActiveNuke = (props: any) => {
  return <NukeIcon className={styles.activeNuke} {...props} />;
};

const InactiveNuke = (props: any) => (
  <InactiveNukeIcon className={styles.nuke} {...props} />
);

const getNumberOfNukes = async () => {
  try {
    return (await fetch("/api/get")).json();
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default function Nukes() {
  const [numberOfNukes, setNumberOfNukes] = useState(0);

  const getNukes = async () => {
    const { error, number } = await getNumberOfNukes();
    if (error) return;

    setNumberOfNukes(number);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getNukes();
    }, 10000);

    getNukes();

    return () => clearInterval(interval);
  }, []);

  const nukes = [
    ...new Array(5)
      .fill(null)
      .map((_, index) =>
        index <= numberOfNukes - 1 ? ActiveNuke : InactiveNuke
      ),
  ];

  return (
    <>
      <Head>
        <title>Nukes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {nukes.map((Nuke, index) => (
          <Nuke key={index} />
        ))}
      </main>
    </>
  );
}