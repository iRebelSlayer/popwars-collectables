import type { Metadata } from "next";
import "./globals.css";
import CartWidget from "@/components/CartWidget";

export const metadata: Metadata = {
  title: "Popwars Collectables — The Vault of Legends",
  description: "Funko Pops, action figures, and 3D prints — claimed one traveler at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <CartWidget />
      </body>
    </html>
  );
}