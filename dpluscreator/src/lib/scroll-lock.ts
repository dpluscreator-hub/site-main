"use client";

type ScrollSnapshot = {
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
  bodyOverflow: string;
  bodyTouchAction: string;
  bodyOverscrollBehavior: string;
};

const activeLocks = new Set<symbol>();
let snapshot: ScrollSnapshot | null = null;

function restoreScrollState() {
  if (!snapshot) return;

  const { documentElement: html, body } = document;
  html.style.overflow = snapshot.htmlOverflow;
  html.style.overscrollBehavior = snapshot.htmlOverscrollBehavior;
  body.style.overflow = snapshot.bodyOverflow;
  body.style.touchAction = snapshot.bodyTouchAction;
  body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior;
  snapshot = null;

  requestAnimationFrame(() => {
    window.dispatchEvent(new Event("resize"));
  });
}

export function lockScroll({ resetScroll = false } = {}) {
  const token = Symbol("scroll-lock");

  if (typeof document === "undefined") {
    return token;
  }

  const { documentElement: html, body } = document;

  if (activeLocks.size === 0) {
    snapshot = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };

    if (resetScroll) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
  }

  activeLocks.add(token);
  return token;
}

export function releaseScrollLock(token: symbol | null | undefined) {
  if (typeof document === "undefined" || !token) return;

  activeLocks.delete(token);

  if (activeLocks.size === 0) {
    restoreScrollState();
  }
}
