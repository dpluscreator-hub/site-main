"use client"
import CircularText from "@/components/motion/CircularText";
import { RevealImage } from "@/components/motion/RevealImage";
import { Magnetic } from "@/components/motion/magnetic";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { FaFacebookSquare, FaHandPointer, FaInstagram, FaLinkedin, FaPinterestSquare, FaWhatsapp } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiFiverrFill, RiTwitterXFill } from "react-icons/ri";
import { DPlusVisitingCard } from "../cards/DPlusVisitingCard";
import { Marquee, MarqueeContent, MarqueeItem } from "../kibo-ui/marquee";
import { HoverTextReveal } from "../motion/HoverTextReveal";
import { TextRevealOnView } from "../motion/TextRevealOnView";
import { ThemeToggler } from "../togglers/ThemeToggler";
import { Button } from "../ui/button";
import { ImagePro } from "./ImagePro";
import { MenuOverlay } from "./MenuOverlay";
import { useCursorElement } from "./cursor/advance-cursor";

interface SocialLink {
    name: string,
    url: string,
    icon: IconType,
    description: string,
    // brand color used to tint the cursor circle on hover
    color: string,
}

interface MenuLink {
    label: string,
    href: string
}

const MENU_LINKS: MenuLink[] = [
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

const socialLinks: SocialLink[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/d_pluscreator",
        icon: FaInstagram,
        description: "Behind the scenes, projects & creative inspiration.",
        color: "#E1306C",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dpluscreator/",
        icon: FaLinkedin,
        description: "Company updates, insights & professional networking.",
        color: "#0A66C2",
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/@DplusCreator",
        icon: AiFillYoutube,
        description: "Case studies, tutorials & creative showcases.",
        color: "#FF0000",
    },
    {
        name: "Pinterest",
        url: "https://in.pinterest.com/dpluscreator",
        icon: FaPinterestSquare,
        description: "Curated design inspiration & visual collections.",
        color: "#E60023",
    },
    {
        name: "X",
        url: "https://x.com/DPlus_Creator",
        icon: RiTwitterXFill,
        description: "Latest updates, ideas & industry conversations.",
        color: "#111111",
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/share/18nf1k1don/",
        icon: FaFacebookSquare,
        description: "Follow our community and latest announcements.",
        color: "#1877F2",
    },
    {
        name: "Fiverr",
        url: "https://www.fiverr.com/s/qD26grV",
        icon: RiFiverrFill,
        description: "Hire us for premium creative & development services.",
        color: "#1DBF73",
    },
    {
        name: "WhatsApp",
        url: "https://wa.me/917693063186",
        icon: FaWhatsapp,
        description: "Chat with our team for a quick consultation.",
        color: "#25D366",
    },
    {
        name: "Email",
        url: "mailto:dpluscreator@gmail.com",
        icon: MdOutlineAlternateEmail,
        description: "Reach us for business enquiries and collaborations.",
        color: "#777777",
    },
];

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
        ? "/assets/logo/logo-stencil-dark.svg"
        : theme === "light"
            ? "/assets/logo/logo-stencil-dark.svg"
            : "/assets/logo/logo-stencil-light.svg";

    const mid = Math.ceil(MENU_LINKS.length / 2);

    const leftLinks = MENU_LINKS.slice(0, mid);
    const rightLinks = MENU_LINKS.slice(mid);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isMenuOpen]);

    const logos = [
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
        { src: logoSrc, alt: "Themed Logo" },
        { src: "/assets/logo/logo-brand.svg", alt: "Themed Logo" },
    ]
    return (
        <>
            <nav
                data-navbar
                className="fixed top-2.5 left-3 right-3 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 flex items-center justify-between bg-background/40 dark:bg-background/45 backdrop-blur-[15px] border border-border/40 dark:border-white/10 rounded-full px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
                <div className="w-full flex items-center justify-between">
                    <Link {...cursor} href={"/"} onClick={closeMenu} className="flex items-center">
                        <RevealImage
                            src={logoSrc}
                            alt="D Plus Creator Logo"
                            width={121.25}
                            height={53.5}
                            containerClassName="object-cover w-[85px] h-[38px] sm:w-[95px] sm:h-[42px] md:w-[105px] md:h-[46px] lg:w-[115px] lg:h-[50px]"
                            fetchPriority="high"
                            loading="eager"
                        />
                    </Link>

                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <ThemeToggler
                                        variant="rectangle"
                                        start="center"
                                        className="size-7 sm:size-8"
                                    />
                                }
                            />
                            <TooltipContent side="top" className="max-w-64 rounded-sm py-2">
                                {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <MenuToggleButton
                                        isOpen={isMenuOpen}
                                        onToggle={() => setIsMenuOpen((prev) => !prev)}
                                    />
                                }
                            />
                            <TooltipContent side="top" className="max-w-64 rounded-sm py-2">
                                {isMenuOpen ? "Close Menu" : "Open Menu"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </nav>

            <MenuOverlay open={isMenuOpen} className="bg-background z-9999">
                <div
                    data-lenis-prevent
                    className="flex flex-col w-full h-full overflow-y-auto lg:overflow-hidden overscroll-contain "
                >
                    {/* TOP: art card + nav links */}
                    <div className="flex flex-col lg:flex-row lg:flex-2/3">
                        <div className="w-full lg:flex-4/7  ">
                            <DPlusVisitingCard />
                        </div>
                        <div className="w-full lg:flex-3/7 flex items-start sm:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 p-6 sm:p-8 md:p-10 lg:p-12 lg:pr-10">
                            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                                {leftLinks.map((item) => (
                                    <MenuLink item={item} closeMenu={closeMenu} key={item.label} />
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                                {rightLinks.map((item) => (
                                    <MenuLink item={item} closeMenu={closeMenu} key={item.label} />
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* BOTTOM: blurb + stencil/circular/marquee + footer */}
                    <div className="flex flex-col lg:flex-1/3">
                        <div className="flex flex-col md:flex-row lg:flex-3/5">
                            <div className="w-full md:flex-2/5 pr-6 sm:pr-8 lg:pr-12 py-4">
                                {/* <BlurText
                                        text="DPlus Creators designs digital experiences that combine thoughtful design, intelligent technology, and creative storytelling to help brands grow with confidence."
                                        animateBy="words"
                                        delay={0.08}
                                        once={false}
                                        duration={0.5}
                                        direction="bottom"
                                        className="text-lg ml-3 sm:text-xl md:text-2xl lg:text-3xl font-semibold font-subtext"
                                /> */}
                                <TextRevealOnView
                                    once={false}
                                >
                                    <h3 className="text-lg ml-3 sm:text-xl md:text-2xl lg:text-3xl font-semibold font-subtext">
                                        DPlus Creators designs digital experiences that combine thoughtful design, intelligent technology, and creative storytelling to help brands grow with confidence.
                                    </h3>
                                </TextRevealOnView>
                            </div>
                            <div className="w-full md:flex-3/5 flex flex-col gap-6 md:gap-0 ">
                                <div className="flex justify-start pl-4 md:flex-1/3 md:justify-end">
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
                                <div className="flex w-full flex-col sm:flex-row gap-6 sm:gap-10 pl-0 sm:pl-10 lg:pl-22 md:gap-18 md:flex-2/3 justify-between items-center">
                                    <MagneticCircle logosrc={logoSrc} />
                                    <div className="w-full flex-1 min-w-0 lg:max-w-160">
                                        <Marquee>
                                            <MarqueeContent>
                                                {Services.map((service) => (
                                                    <MarqueeItem key={service}>
                                                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-subtext">
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
                        <div className="flex flex-col sm:flex-row lg:flex-2/5 pl-4 gap-4 sm:gap-0 py-4 lg:py-0">
                            <div className="w-full sm:flex-2/5 flex flex-col-reverse gap-4 sm:gap-0">
                                <div className="flex flex-col items-start justify-center pt-6 pb-3">
                                    <FooterLink href={"/privacy"} closeMenu={closeMenu}>Privacy Policy.</FooterLink>
                                    <FooterLink href={"/terms"} closeMenu={closeMenu}>Terms & Conditions.</FooterLink>
                                    <span className="text-xs font-light font-subtext">All Rights Reserved to www.dpluscreator.com</span>
                                </div>
                                <Marquee>
                                    <MarqueeContent direction="right" gradient gradientWidth={80} gradientColor={"var(--accent)"}>
                                        {logos.map((logo, i) => (
                                            <MarqueeItem key={i}>
                                                <ImagePro
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    width={121.25 / 2}
                                                    height={53.5 / 2}
                                                    containerClassName="object-cover"
                                                    fetchPriority="high"
                                                    loading="eager"
                                                />
                                            </MarqueeItem>
                                        ))}
                                    </MarqueeContent>
                                </Marquee>
                            </div>
                            <div className=" w-full sm:flex-3/5 flex lg:justify-end justify-start gap-4.5 items-center min-h-12 flex-wrap ">
                                {socialLinks.map((socialLink: SocialLink) => (
                                    <SocialLinkItem
                                        key={socialLink.name}
                                        socialLink={socialLink}
                                        isLast={socialLink.name === socialLinks[socialLinks.length - 1].name}
                                    />
                                ))}
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
            variant={"none"}
            size={"icon"}
            {...cursor}
            onClick={onToggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="group flex flex-col items-end justify-center gap-1.5 w-8 sm:w-10 hover:bg-background dark:hover:bg-background"
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


const MenuLink = ({
    item,
    closeMenu,
}: {
    item: MenuLink;
    closeMenu: () => void;
}) => {
    const cursor = useCursorElement({
        state: "icon",
        icon: <FaHandPointer className="size-9 text-foreground" />,
        backgroundColor: "transparent",
    });

    return (
        <Link
            href={item.href}
            onClick={closeMenu}
            {...cursor}
            className="group inline-block whitespace-nowrap"
        >
            <HoverTextReveal
                className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading"
                revealClassName="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading"
            >
                {item.label}
            </HoverTextReveal>
        </Link>
    );
};

// Small footer links (Privacy/Terms) — a subtle text cursor is enough here,
// no need for the big icon treatment used on the main menu links.
const FooterLink = ({
    href,
    closeMenu,
    children,
}: {
    href: string;
    closeMenu: () => void;
    children: React.ReactNode;
}) => {
    const cursor = useCursorElement({
        state: "text",
        text: "View",
        circleSize: 20,
        textColor: "var(--foreground)",
        circleOpacity: 0.6
    });
    return (
        <Link
            className="text-xs font-light font-subtext"
            href={href}
            onClick={closeMenu}
            {...cursor}
        >
            {children}
        </Link>
    );
};

// Each social icon gets its own cursor: the platform's own icon rendered
// inside the cursor circle, tinted with that brand's color. Pulled out of
// the .map() into its own component since hooks can't be called in a loop.
const SocialLinkItem = ({
    socialLink,
    isLast,
}: {
    socialLink: SocialLink;
    isLast: boolean;
}) => {
    const Icon = socialLink.icon;
    const isMail = socialLink.url.startsWith("mailto:");

    const cursor = useCursorElement({
        state: "icon",
        icon: <Icon className="size-10" style={{
            color: socialLink.color
        }} />,
        circleOpacity: 0.9,
        backgroundColor: "var(--accent)",
        circleSize: 40,
    });

    return (
        <a
            href={socialLink.url}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            aria-label={socialLink.name}
            {...cursor}
        >
            <Tooltip>
                <TooltipTrigger
                    render={
                        <div
                            className={cn(
                                "flex items-center justify-center py-3 pl-3",
                                !isLast && "pr-3"
                            )}
                        >
                            <Icon className="size-8" />
                        </div>
                    }
                />
                <TooltipContent side="top" className="max-w-64 rounded-sm py-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                            <Icon className="size-3.5 text-primary" />
                            <span className="text-base font-semibold text-primary font-subtext ">
                                {socialLink.name}
                            </span>
                        </div>
                        <p className="text-xs text-muted font-subtext leading-tight">
                            {socialLink.description}
                        </p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </a>
    );
};

const MagneticCircle = ({ logosrc }: { logosrc: string }) => {
    const cursor = useCursorElement({
        state: "icon",
        icon: (
            <ImagePro
                src={logosrc}
                alt="D Plus Creator Logo"
                width={101.04}
                height={44.58}
                containerClassName="w-8 h-3.5 object-contain"
                fetchPriority="high"
                loading="eager"
            />
        ),
        circleSize: 80,
        circleOpacity: 0,
    });

    return (
        <div {...cursor} className="inline-block">
            <Magnetic>
                <CircularText
                    direction="clockwise"
                    fontSize={10}
                    fontWeight={500}
                    hoverSpeedMultiplier={3.5}
                    respectReducedMotion
                    size={100}
                    uppercase={false}
                    className="font-mono"
                >
                    DPlus Creator
                </CircularText>
            </Magnetic>
        </div>
    );
};
