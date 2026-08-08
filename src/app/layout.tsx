import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import LenisProvider from "@/components/Lenis";
import Header from "@/components/Header";

const neueMontreal = localFont({
    src: "../../public/fonts/ppneuemontreal.otf",
    variable: "--font-sans",
    display: "swap",
});

const editorialNew = localFont({
    src: "../../public/fonts/PPEditorialNew.otf",
    variable: "--font-serif",
    display: "swap",
});

export const metadata: Metadata = {
    title: "The Up&Up Group",
    description: "~@sauroww(x) @saur0w(GitHub)",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${neueMontreal.variable} ${editorialNew.variable}`}>
        <body>
            <LenisProvider>
                <Header />
                {children}
            </LenisProvider>
        </body>
        </html>
    );
}