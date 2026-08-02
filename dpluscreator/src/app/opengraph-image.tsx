import { ImageResponse } from "next/og";
import { OgFrame, ogAlt, ogSize, ogContentType } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(<OgFrame />, { ...size });
}
