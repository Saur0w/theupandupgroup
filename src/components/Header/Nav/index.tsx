"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface NavProps {
    isActive: boolean;
    setIsActive: (active: boolean) => void;
}

export default function Nav({ isActive, setIsActive }: NavProps) {
    const navRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isActive) {
            gsap.to(navRef.current, {
                y: "0%",
                duration: 0.75,
                ease: "power4.inOut",
            });
        } else {
            gsap.to(navRef.current, {
                y: "100%",
                duration: 0.75,
                ease: "power4.inOut",
            });
        }
    }, { scope: navRef, dependencies: [isActive] });
    return (
        <section className={styles.navbar} ref={navRef}>

        </section>
    )
}