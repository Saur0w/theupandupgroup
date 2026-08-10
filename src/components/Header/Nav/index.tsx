"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface NavProps {
    isActive: boolean;
    setIsActive: (active: boolean) => void;
}

const defaultImage = "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fd6d91c2a961c266e3_Resting.webp";

const links = [
    {
        title: "About Us",
        href: "/about",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fef12355075e5ce0fb_1d0a4a30456fd2b922e7667ed0cd50d7_About%20Us.webp"
    },
    {
        title: "Our Solutions",
        href: "/solutions",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0feb0af85b789be8775_Our%20Solutions.webp"
    },
    {
        title: "Our Work",
        href: "/work",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fe363665eff7366cdc_07157f26a201b0c3b678570ec9cb2499_Our%20Work.webp"
    },
    {
        title: "Thought",
        href: "/thought",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fd36d91a063726e039_0e7889226a494c57c46781c8ae0254a2_Thought.webp"
    },
    {
        title: "Join Us",
        href: "/join",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fe78a67e78c403163c_74f8520b0ca770886311a42c91da3531_Join%20Us.webp"
    },
    {
        title: "Contact Us",
        href: "/contact",
        img: "https://cdn.prod.website-files.com/6849774f52d7d3e2a87bb201/689dc0fd8b97476db76908b8_7636b15a32859b9c43a62777a4e292fd_Contact%20Us.webp"
    },
];

const PILL_HEIGHT = 50;

export default function Nav({ isActive, setIsActive }: NavProps) {
    const navRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    // quickTo setters — updating these on every mousemove is what makes
    // this smooth instead of thrashing layout with inline `top` styles
    const pillYSetter = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
    const pillOpacitySetter = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

    const [activeImage, setActiveImage] = useState(defaultImage);

    const handleMouseEnter = (newImg: string) => {
        if (newImg === activeImage) return;

        gsap.to(imageRef.current, {
            opacity: 0.5,
            duration: 0.15,
            onComplete: () => {
                setActiveImage(newImg);
                gsap.to(imageRef.current, {
                    opacity: 1,
                    duration: 0.25
                });
            }
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!linksRef.current || !pillYSetter.current) return;

        const rect = linksRef.current.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;

        // Clamp so the pill can never be pushed above/below the links
        // container — this is what let it reach "About Us" (the top link)
        // instead of clipping under .navbar's overflow: hidden.
        const maxY = Math.max(rect.height - PILL_HEIGHT, 0);
        const clampedY = Math.min(Math.max(relativeY - PILL_HEIGHT / 2, 0), maxY);

        pillYSetter.current(clampedY);
    };

    const handleLinksEnter = () => {
        pillOpacitySetter.current?.(1);
    };

    const handleLinksLeave = () => {
        pillOpacitySetter.current?.(0);
        handleMouseEnter(defaultImage);
    };

    useGSAP(() => {
        if (!pillRef.current) return;

        gsap.set(pillRef.current, { xPercent: -50, opacity: 0 });

        pillYSetter.current = gsap.quickTo(pillRef.current, "y", {
            duration: 0.12,
            ease: "power3.out",
        });

        pillOpacitySetter.current = gsap.quickTo(pillRef.current, "opacity", {
            duration: 0.2,
            ease: "power2.out",
        });
    }, []);

    useGSAP(() => {
        if (isFirstRender.current) {
            gsap.set(navRef.current, {
                bottom: 0,
                top: "auto",
                height: "0vh",
                opacity: 0,
                pointerEvents: "none"
            });
            isFirstRender.current = false;
            return;
        }

        if (isActive) {
            const tl = gsap.timeline();

            tl.set(navRef.current, {
                bottom: 0,
                top: "auto",
                opacity: 1,
                pointerEvents: "auto"
            })
                .to(navRef.current, {
                    height: "100vh",
                    duration: 0.75,
                    ease: "power4.inOut",
                })
                .to(closeBtnRef.current, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power3.out",
                }, "-=0.3");

            if (linksRef.current?.children) {
                tl.fromTo(
                    Array.from(linksRef.current.children),
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );
            }

            tl.fromTo(
                imageRef.current,
                { scale: 1.08, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.6"
            );
        } else {
            const tl = gsap.timeline();

            tl.to(closeBtnRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
            })
                .set(navRef.current, {
                    top: 0,
                    bottom: "auto",
                })
                .to(navRef.current, {
                    height: "0vh",
                    duration: 0.65,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(navRef.current, {
                            bottom: 0,
                            top: "auto",
                            opacity: 0,
                            pointerEvents: "none"
                        });
                    }
                });
        }
    }, { scope: navRef, dependencies: [isActive] });

    return (
        <section className={styles.navbar} ref={navRef}>
            <div className={styles.topBar}>
                <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.pillBtn}
                >
                    LINKEDIN
                </Link>
                <button className={styles.pillBtn}>
                    NEWSLETTER
                </button>
            </div>

            <div className={styles.upperSection}>
                <div
                    className={styles.navLinks}
                    ref={linksRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleLinksEnter}
                    onMouseLeave={handleLinksLeave}
                >
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className={styles.linkContainer}
                            onMouseEnter={() => handleMouseEnter(link.img)}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsActive(false)}
                            >
                                {link.title}
                            </Link>
                        </div>
                    ))}

                    <div className={styles.pill} ref={pillRef} />
                </div>
            </div>

            <div className={styles.imageSection} ref={imageRef}>
                <Image
                    src={activeImage}
                    alt="Navigation preview"
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                />
            </div>

            <header
                ref={closeBtnRef}
                onClick={() => setIsActive(false)}
                className={styles.closeHeader}
            >
                <button aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </header>
        </section>
    );
}