import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popwars Collectables — The Vault of Legends",
  description: "Funko Pops, anime figures, and 3D prints — claimed one traveler at a time.",
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