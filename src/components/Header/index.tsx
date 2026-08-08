"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {

    }, { scope: headerRef })
    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.body}>
                <nav>
                    <Link href="/about">About</Link>
                    <Link href="/solutions">Solutions</Link>
                    <Link href="/work">Work</Link>
                    <Link href="/thought">Thought</Link>
                </nav>
                <div className={styles.burger}>
                    <button>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    )
}