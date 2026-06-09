import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PIKET.pl — kolekcjonuj, handluj, wygrywaj",
  description: "Nadchodząca platforma marketplace dla pasjonatów kart kolekcjonerskich.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={outfit.variable}>{children}</body>
    </html>
  );
}
