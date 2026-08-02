"use client"

import ReactLenis, { useLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onScroll)

    // ── CRITICAL FIX: jab bhi ScrollTrigger refresh ho, Lenis ka apna
    // internal scroll-limit bhi resize karo. Bina isके ScrollTrigger
    // trigger-positions toh update ho jaate hain, lekin Lenis ka wheel-driven
    // "limit" purana hi rehta hai — isi se wheel scroll last mein atakta hai
    // jabki keyboard/native scroll poori height tak chala jaata hai.
    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener("refresh", onRefresh)

    // fonts load hone ke baad refresh — text-[10vw] heading jaisi cheezein
    // font-swap ke baad height badal deti hain
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    // window "load" — saari images (RevealImage sections) load hone ke
    // baad bhi ek final refresh, kyunki fonts.ready image load ka wait nahi karta
    const onWindowLoad = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener("load", onWindowLoad)

    // safety net: agar body ki height kabhi bhi change ho (late image load,
    // dynamic content, etc.) toh dono ko re-sync kar do
    const ro = new ResizeObserver(() => {
      lenis.resize()
      ScrollTrigger.refresh()
    })
    ro.observe(document.body)

    return () => {
      lenis.off("scroll", onScroll)
      ScrollTrigger.removeEventListener("refresh", onRefresh)
      window.removeEventListener("load", onWindowLoad)
      ro.disconnect()
      ScrollTrigger.clearScrollMemory()
    }
  }, [lenis])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        syncTouchLerp: 0.05,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoResize: true,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}