import type { Metadata } from "next";

// /team was removed from the primary nav/footer (intentional). It's kept live
// but marked noindex so it isn't an orphaned page competing in search results.
// To bring it back: re-link it from the nav/footer and set index:true.
export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the creative minds behind DPLUS Creator—the strategists, designers, and marketers helping brands grow online.",
  alternates: { canonical: "/team" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Team | DPLUS Creator",
    description: "Meet the creative minds behind DPLUS Creator.",
    url: "/team",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
