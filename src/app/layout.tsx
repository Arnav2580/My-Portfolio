import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Nav } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/site-footer";
import "@/styles/globals.css";
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://arnavgoyal.com"),
  title: {
    default: "Arnav Goyal — Building things that matter",
    template: "%s — Arnav Goyal",
  },
  description:
    "The work, story, and evolving ideas of Arnav Goyal. Exploring healthcare, AI, blockchain, aerospace, and a future beyond Earth.",
  icons: { icon: "/assets/brand/monogram.svg" },
  openGraph: {
    type: "website",
    siteName: "Arnav Goyal",
    title: "Arnav Goyal — Building things that matter",
    description: "Curious by nature. Builder by choice.",
    images: [
      {
        url: "/assets/profile/arnav-goyal-portrait.png",
        width: 1086,
        height: 955,
      },
    ],
  },
  twitter: { card: "summary", creator: "@ArnavGoyal_X" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      data-motion="active"
      lang="en"
      suppressHydrationWarning
      className={sans.variable + " " + serif.variable + " " + mono.variable}
    >
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Arnav Goyal",
              url: "https://arnavgoyal.com",
              image:
                "https://arnavgoyal.com/assets/profile/arnav-goyal-portrait.png",
              sameAs: [
                "https://github.com/Arnav2580",
                "https://www.linkedin.com/in/arnav2580/",
                "https://x.com/ArnavGoyal_X",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
