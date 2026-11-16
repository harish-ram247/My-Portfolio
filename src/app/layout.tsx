import type { Metadata, Viewport } from "next";
// Fonts are bundled with the site (no request to a font CDN at build or run time).
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/schibsted-grotesk/wght.css";
import "@fontsource-variable/martian-mono/wdth.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import { LightsProvider } from "@/components/LightsProvider";
import { person } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${person.name} — Backend developer`,
  description: person.line,
  openGraph: {
    title: `${person.name} — Backend developer`,
    description: person.line,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

// Runs before first paint: marks that motion is allowed, so intro elements can
// start hidden without a flash, and stay visible when motion is reduced.
const bootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(r?'still':'anim');d.dataset.lights=r?'on':'off';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LightsProvider>{children}</LightsProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
