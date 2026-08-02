"use client"
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";

import { Marquee, MarqueeContent, MarqueeItem } from "../kibo-ui/marquee";
import { ThemeToggler } from "../togglers/ThemeToggler";
import { Button } from "../ui/button";
import { MenuOverlay } from "./MenuOverlay";
import { RevealImage } from "./RevealImage";
import { useCursorElement } from "./cursor/advance-cursor";
import CircularText from "./CircularText";
import { Magnetic } from "./magnetic";
import { DPlusVisitingCard } from "../cards/DPlusVisitingCard";
import { ImagePro } from "./ImagePro";

const MENU_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },

    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
];

const Services = [
    "Social Media Management & Growth Strategy  ●",
    "High-Converting Reel & Video Editing  ●",
    "Strategic Brand Identity & Visual Design  ●",
    "Custom Business Web & Landing Page Development  ●",
    "3D Modeling & Visual Animation  ●",
    "AI Automations & WhatsApp Workflows  ●",
    "AEO & Search Engine Optimization  ●",
    "Creative Technology Studio for Growing Brands  ●"
]


export const Navbar = () => {
    const { theme } = useTheme();
    const mounted = useMounted();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cursor = useCursorElement({
        state: "icon",
        icon: <GoHomeFill className="h-8.5 w-8.5 fill-primary" />,
        backgroundColor: "#111111",
        circleOpacity: 0.25,
        circleSize: 30
    });

    const logoSrc = !mounted
        ? "/assets/logo/logo-brand.svg"
        : theme === "light"
            ? "/assets/logo/logo-dark.svg"
            : "/assets/logo/logo-light.svg";

    const stencilSrc = !mounted
        ? "/assets/logo/logo-stencil.svg"
        : theme === "light"
            ? "/assets/logo/logo-stencil-dark.svg"
            : "/assets/logo/logo-stencil-light.svg";

    const mid = Math.ceil(MENU_LINKS.length / 2);

    const leftLinks = MENU_LINKS.slice(0, mid);
    const rightLinks = MENU_LINKS.slice(mid);


    const logos = [
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
        {
            src: logoSrc,
            alt: "Themed Logo"
        },
        {
            src: "/assets/logo/logo-brand.svg",
            alt: "Themed Logo"
        },
    ]
    return (
        <>
            <nav className="relative z-50 px-48 py-2 h-22.5 bg-background">
                <div className="flex items-center justify-between">
                    <Link {...cursor} href={"/"}>
                        <RevealImage
                            src={logoSrc}
                            alt="D Plus Creator Logo"
                            width={121.25}
                            height={53.5}
                            containerClassName="object-cover"
                            fetchPriority="high"
                            loading="eager"
                        />
                    </Link>

                    <div className="flex items-center gap-5">
                        <ThemeToggler
                            variant="rectangle"
                            start="center"
                            className="size-8"
                        />
                        <MenuToggleButton
                            isOpen={isMenuOpen}
                            onToggle={() => setIsMenuOpen((prev) => !prev)}
                        />
                    </div>
                </div>
            </nav>

            <MenuOverlay open={isMenuOpen} className="bg-accent">
                <div className="flex flex-col w-full h-full">
                    <div className="flex-2/3 flex bg-">
                        <div className=" flex-4/7 p-10 pb-0">
                            {/* ART ASSETS - single wide combined section */}
                            <DPlusVisitingCard/>
                        </div>
                        <div className=" flex-3/7 flex items-center gap-16 p-12 pr-10">
                            <div className="flex flex-col gap-8">
                                {leftLinks.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <span className="text-7xl font-bold font-heading ">
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-8">
                                {rightLinks.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <span className="text-7xl font-bold font-heading ">
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="flex-1/3 flex flex-col">
                        <div className="flex-3/5 flex">
                            <div className="flex-2/5 px-12 py-4">
                                {/* TEXT */}
                                <p className="text-3xl font-semibold font-subtext">DPlus Creators is a premium creative technology studio building high-converting websites, AI automations, and brand content.</p>
                            </div>
                            <div className="flex-3/5  flex flex-col">
                                <div className="flex-1/3 flex justify-end">
                                    {/* Logo stencil */}
                                    <RevealImage
                                        src={stencilSrc}
                                        alt="D Plus Creator Logo"
                                        width={121.25}
                                        height={53.5}
                                        containerClassName="object-cover"
                                        fetchPriority="high"
                                        loading="eager"
                                    />

                                </div>
                                <div className=" flex-2/3 flex gap-18 justify-between items-center">
                                    <Magnetic>
                                        <CircularText
                                            direction="clockwise"
                                            fontSize={10}
                                            fontWeight={500}
                                            hoverSpeedMultiplier={3.5}
                                            respectReducedMotion
                                            size={100}
                                            // color="var(--primary)"
                                            uppercase={false}
                                            className="font-mono"
                                        >
                                            DPlus Creator
                                        </CircularText>
                                    </Magnetic>
                                    <div className="w-full max-w-160">
                                        <Marquee>
                                            <MarqueeContent>
                                                {Services.map((service) => (
                                                    <MarqueeItem key={service}>
                                                        <span className="text-3xl font-semibold font-subtext  ">
                                                            {service}
                                                        </span>
                                                    </MarqueeItem>
                                                ))}
                                            </MarqueeContent>
                                        </Marquee>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className=" flex-2/5 flex px-4 ">
                            <div className=" flex-2/5 flex flex-col-reverse ">
                                <div className="flex flex-col items-start justify-center pt-6 pb-3">
                                    <Link className="text-xs font-light font-subtext " href={"/privacy"}> Privacy Policy.</Link>
                                    <Link className="text-xs font-light font-subtext " href={"/terms"}> Terms & Conditions.</Link>
                                    <span className="text-xs font-light font-subtext ">All Rights Reserved to www.dpluscreator.com</span>
                                </div>
                                {/* MARQUEE WITH FEW LOGOS */}
                                <Marquee>
                                    <MarqueeContent direction="right">
                                        {logos.map((logo,i) => (
                                            <MarqueeItem key={i}>
                                                <ImagePro
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    width={121.25/2}
                                                    height={53.5/2}
                                                    containerClassName="object-cover"
                                                    fetchPriority="high"
                                                    loading="eager"
                                                />
                                            </MarqueeItem>
                                        ))}
                                    </MarqueeContent>
                                </Marquee>
                            </div>
                            <div className="bg-teal-500 flex-3/5 flex justify-start gap-3.5 items-center">
                                {/* SOCIAL LINKS */}
                            </div>
                        </div>
                    </div>
                </div>
            </MenuOverlay>
        </>
    )
}

const MenuToggleButton = ({
    isOpen,
    onToggle,
}: {
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const cursor = useCursorElement({
        state: "pointer",
    });
    const lineClass =
        "h-0.5 bg-foreground transition-[width,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            {...cursor}
            onClick={onToggle}
            className="group flex flex-col items-end justify-center gap-1.5 w-10 hover:bg-background dark:hover:bg-background"
        >
            {!isOpen ?
                <>
                    <span className={cn(lineClass, "w-6 group-hover:w-2")} />
                    <span className={cn(lineClass, "w-4 group-hover:w-4")} />
                    <span className={cn(lineClass, "w-2 group-hover:w-6")} />
                </> :
                <div className="flex items-center relative group mr-2.5">
                    <span className={cn(
                        lineClass,
                        "absolute w-6 rotate-45 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
                        "group-hover:rotate-0"
                    )}
                    />
                    <span className={cn(
                        lineClass,
                        "absolute w-6 -rotate-45 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
                        "group-hover:rotate-0"
                    )}
                    />
                </div>

            }
        </Button>
    );
};