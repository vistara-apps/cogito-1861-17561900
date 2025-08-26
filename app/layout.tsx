
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Cogito - AI Agents Activity Registry",
  description: "Your AI Agents' Live Activity Log, Publicly Verifiable",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/frame-image.png",
      button: {
        title: "Launch Cogito",
        action: {
          type: "launch_frame",
          name: "Cogito",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/splash.png",
          splashBackgroundColor: "#f8fafc",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
