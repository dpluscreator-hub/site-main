import { MotionHeading } from "@/components/globals/MotionHeading";
import { RevealImage } from "@/components/globals/RevealImage";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      {/* ---------- SECTION 1: Hero — page load pe hi visible ---------- */}
      <section className="relative h-screen w-full">
        <RevealImage
          src="/assets/images/hero.jpg"
          alt="Hero image"
          fill
          priority
          revealDirection="center"
          revealDuration={1}
          containerClassName="h-full w-full"
          imageClassName="object-contain"
        />
      </section>

      {/* ---------- Original content ---------- */}
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <Link
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </Link>{" "}
            or the{" "}
            <Link
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </Link>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </Link>
        </div>
      </main>

      {/* ---------- SECTION 2: Scroll-triggered reveal test ---------- */}
      <section className="flex w-full max-w-3xl flex-col gap-24 px-16 py-32">
        <div>
          <p className="mb-4 text-sm text-zinc-500">
            Scroll down — yeh image tab reveal hogi jab viewport mein aayegi
          </p>
          <RevealImage
            src="/assets/images/o1.jpg"
            alt="Scroll reveal test 1"
            width={736}
            height={920}
            revealDirection="bottom"
            revealDuration={0.9}
            revealStart="start 50%"
            containerClassName="w-full rounded-4xl flex items-end"
            imageClassName="object-cover "
          />
        </div>

        <RevealImage
          src="/assets/images/o2.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="top"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o3.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="left"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o4.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="right"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o5.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="center"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o6.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="top-left"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o7.jpg"
          alt="Scroll reveal test 2"
          width={736}
          height={920}
          revealDirection="top-right"
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o8.jpg"
          alt="Scroll reveal test 2"
          revealDirection="bottom-left"
          width={736}
          height={920}
          revealDuration={0.9}
          revealStart="start 60%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o1.jpg"
          alt="x"
          width={736}
          height={920}
          revealDuration={1.2}
          revealStart="start 20%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
        />

        <RevealImage
          src="/assets/images/o2.jpg"
          alt="x"
          width={736}
          height={920}
          revealDuration={1.2}
          revealStart="start 20%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
          revealType="blur"
          blurAmount={24}
        />

        <RevealImage
          src="/assets/images/o3.jpg"
          alt="x"
          width={736}
          height={920}
          revealDuration={1.2}
          revealStart="start 20%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
          revealType="grayscale"
        />

        <RevealImage
          src="/assets/images/o4.jpg"
          alt="x"
          width={736}
          height={920}
          revealDuration={1.2}
          revealStart="start 20%"
          containerClassName="w-full rounded-4xl flex items-end"
          imageClassName="object-cover "
          revealType="pixelate"
          pixelSize={32}
        />

        <div></div>
      </section>
      <section className="h-screen flex items-start justify-center flex-col">
        <MotionHeading as="h1" clipReveal clipDirection="right">
          Digitally
        </MotionHeading>

        <MotionHeading as="h1" dot clipReveal clipDirection="right">
          Aware
        </MotionHeading>
      </section>
    </div>
  );
}
