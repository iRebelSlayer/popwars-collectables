import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popwars Collectables — Coming Soon",
  description: "Every shelf tells a story. The gates are being forged.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}