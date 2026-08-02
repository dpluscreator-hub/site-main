// Pure geometry for the Services 3D carousel. Kept framework-free so it can be
// unit-tested in isolation and reused without pulling in React.

export interface CardStyle {
  scale: number;
  x: string;
  rotateY: number;
  opacity: number;
  filter: string;
  zIndex: number;
  boxShadow: string;
}

/**
 * Signed offset of card `i` from the `active` card on a ring of `total` cards,
 * wrapped into the range [-total/2, total/2] so the nearest direction wins.
 */
export function getRelPos(i: number, active: number, total: number): number {
  let rel = i - active;
  if (rel > total / 2) rel -= total;
  if (rel < -total / 2) rel += total;
  return rel;
}

/**
 * Visual style for a card at signed offset `relPos`. Returns `null` for cards
 * further than 2 positions away (they aren't rendered).
 */
export function getCardStyle(relPos: number): CardStyle | null {
  const abs = Math.abs(relPos);
  if (abs > 2) return null;

  const sign = relPos >= 0 ? 1 : -1;

  if (abs === 0) {
    return {
      scale: 1.06,
      x: "0%",
      rotateY: 0,
      opacity: 1,
      filter: "grayscale(0)",
      zIndex: 10,
      boxShadow: "0 0 50px rgba(245,166,35,0.12), 0 30px 80px rgba(0,0,0,0.5)",
    };
  }
  if (abs === 1) {
    return {
      scale: 0.82,
      x: `${sign * 56}%`,
      rotateY: sign * -14,
      opacity: 0.82,
      filter: "grayscale(1)",
      zIndex: 5,
      boxShadow: "none",
    };
  }
  return {
    scale: 0.64,
    x: `${sign * 96}%`,
    rotateY: sign * -26,
    opacity: 0.55,
    filter: "grayscale(1)",
    zIndex: 2,
    boxShadow: "none",
  };
}
