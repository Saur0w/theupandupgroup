"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top+=400 top",
                end: "top+=500 top",
                scrub: 0.8,
            }
        });

        tl
            .to(headerRef.current, {
                width: "320px",
                ease: "none"
            }, 0)
            .to(navRef.current, {
                opacity: 0,
                width: 0,
                pointerEvents: "none",
                ease: "none",
            }, 0)
            .to(logoRef.current, {
                opacity: 1,
                width: 24,
                ease: "none",
            }, 0);

    }, { scope: headerRef });

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.body}>
                <div className={styles.logo} ref={logoRef}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 26"
                        fill="none"
                        className={styles.logoIcon}
                    >
                        <path d="M16.2241 15.4178V15.5865C16.7567 15.7785 16.2024 16.291 15.9162 16.4917C15.8442 16.5425 6.27455 23.2545 5.99743 23.4488C5.82764 23.5678 5.65784 23.6867 5.48804 23.8062C5.21042 24.0015 4.82044 24.0035 4.49445 23.9566C4.16392 23.9092 3.84247 23.7854 3.56686 23.5929C3.20107 23.3376 2.92093 22.9552 2.84434 22.505C2.71485 21.7444 3.12095 20.9944 3.60364 20.3982C4.29694 19.5414 5.15852 18.862 6.04127 18.2025L8.51971 16.4753L4.91466 11.812L4.77963 11.9058C5.09 12.9536 4.87435 13.811 3.43485 14.8138L3.39203 14.8491C2.82318 15.2659 2.22309 15.7287 1.69254 16.2422C1.1252 16.791 0.639996 17.3969 0.362879 18.0646C-0.241238 19.5206 -0.089579 21.2971 0.80677 22.5969C1.83714 24.0905 3.78805 24.8564 5.53943 24.4696C5.54649 24.4469 6.18739 26 6.18739 26L11.9378 25.9985V25.779C11.9378 25.779 11.0495 25.1383 12.0769 24.1548C12.2442 24.0363 12.412 23.9179 12.5792 23.7999C13.0125 23.4933 20.4529 18.2334 20.9285 17.8978C21.8677 17.2339 22.7358 16.3703 23.7813 15.8762C23.8529 15.8423 23.9254 15.8109 24 15.7852V15.5106L16.2246 15.4192L16.2241 15.4178Z" fill="currentColor" />
                        <path d="M21.7115 24.9502L18.569 20.8416L14.9695 23.3971L16.5874 25.5692L16.9355 25.9937L23.1137 25.9927V25.8008C23.1137 25.8008 22.2249 25.7273 21.712 24.9498" fill="currentColor" />
                        <path d="M13.7028 11.5673C12.9737 11.8768 12.0905 11.6239 11.4692 11.1858C11.0002 10.857 7.68332 6.29097 6.66302 4.86936L6.65798 4.86259C6.2156 4.27122 6.09317 3.55607 6.4902 2.88492C6.79805 2.2979 7.18148 2.0247 7.80374 1.93041C9.9718 1.56051 11.9227 4.35101 12.7012 5.49168C13.4771 6.6865 14.316 7.97513 14.4888 9.43348C14.6092 10.3682 14.378 11.2385 13.7023 11.5683M16.2039 4.14164C15.2234 2.29935 13.6479 0.72737 11.6179 0.170333C7.72463 -0.898287 4.33926 3.2674 4.25613 6.90844C4.22942 8.07957 4.64107 9.12402 5.2341 10.1264C5.69764 10.9097 6.2156 11.6636 6.75674 12.4039C7.65157 13.6277 11.2773 18.4408 11.2773 18.4408L14.8642 15.9066C14.8642 15.9066 12.7662 13.1828 12.4911 12.8018C13.3909 12.4793 14.1875 11.9271 14.8808 11.2724C16.7954 9.46443 17.4731 6.52838 16.2034 4.14212" fill="currentColor" />
                    </svg>
                </div>

                <nav ref={navRef}>
                    <Link href="/about">
                        <PerspectiveText label="About" />
                    </Link>
                    <Link href="/solutions">
                        <PerspectiveText label="Solutions" />
                    </Link>
                    <Link href="/work">
                        <PerspectiveText label="Work" />
                    </Link>
                    <Link href="/thought">
                        <PerspectiveText label="Thought" />
                    </Link>
                </nav>

                <div className={styles.burger}>
                    <button aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

interface PerspectiveProps {
    label: string;
}

function PerspectiveText({ label }: PerspectiveProps) {
    return (
        <div className={styles.perspectiveText}>
            <span>{label}</span>
            <span>{label}</span>
        </div>
    );
}