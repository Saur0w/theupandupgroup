"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Des() {
    return (
        <section className={styles.des}>
            <div className={styles.body}>
                <div className={styles.text}>
                    <p>
                        Since <span>2010</span> we have used creativity to elevate some of the world’s most ambitious brands, organisations and causes on the African continent and beyond.</p>
                </div>
            </div>
        </section>
    )
}