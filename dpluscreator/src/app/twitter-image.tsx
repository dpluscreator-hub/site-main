import { ImageResponse } from "next/og";
import { OgFrame, ogAlt, ogSize, ogContentType } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return new ImageResponse(<OgFrame />, { ...size });
}
