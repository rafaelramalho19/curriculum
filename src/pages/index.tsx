import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rafael Ramalho</title>
        <meta
          name="description"
          content="Portfolio page for a Portuguese software developer living in Spain."
        />
      </Head>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}
