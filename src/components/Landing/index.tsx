"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.text}>
                <h1>Creativity <br />Elevates<br /><span>Everything</span></h1>
            </div>
            <div className={styles.videoWrapper}>
                <video
                    src="https://cdn.jsdelivr.net/gh/geoffdawes/upupdev/upup.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
        </section>
    )
}