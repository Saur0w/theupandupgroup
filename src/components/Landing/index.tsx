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
    const word1Ref = useRef<HTMLSpanElement>(null);
    const word2Ref = useRef<HTMLSpanElement>(null);
    const word3Ref = useRef<HTMLSpanElement>(null);
    const word4Ref = useRef<HTMLSpanElement>(null);

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
        });

        const words = [word1Ref.current, word2Ref.current, word3Ref.current, word4Ref.current];

        gsap.set([word2Ref.current, word3Ref.current, word4Ref.current], { yPercent: 100 });

        const stepDuration = 1;

        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: landingRef.current,
                start: "top top",
                end: "+=500",
                scrub: true,
            }
        });

        for (let i = 0; i < words.length - 1; i++) {
            const time = i * stepDuration;
            textTl
                .to(words[i],     { yPercent: -100, ease: "none", duration: stepDuration }, time)
                .to(words[i + 1], { yPercent: 0,     ease: "none", duration: stepDuration }, time);
        }

    }, { scope: landingRef });

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.text}>
                <h1>Creativity <br />Elevates<br />
                    <span className={styles.wordMask}>
                        <span ref={word1Ref} className={styles.word}>Everything</span>
                        <span ref={word2Ref} className={styles.word}>Impact</span>
                        <span ref={word3Ref} className={styles.word}>Growth</span>
                        <span ref={word4Ref} className={styles.word}>Relevance</span>
                    </span>
                </h1>
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
    );
}