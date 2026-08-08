"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        gsap.to(videoRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: landingRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
    }, { scope: landingRef })

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
                    ref={videoRef}
                />
            </div>
        </section>
    )
}