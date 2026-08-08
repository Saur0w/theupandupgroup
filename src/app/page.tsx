"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Header from "@/components/Logo";
import Des from "@/components/Des";

export default function Home() {
  return (
    <div className={styles.page}>
        <Header />
      <Landing />
        <Des />
    </div>
  );
}
