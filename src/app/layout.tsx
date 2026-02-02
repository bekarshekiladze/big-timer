import { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import TitleUpdater from "@/components/TitleUpdater";

const jost = Jost({
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Big Timer | fullscreen countdown timer",
  description:
    "Stay focused and manage your time effectively with our customizable timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <TitleUpdater />
        {children}
      </body>
    </html>
  );
}
