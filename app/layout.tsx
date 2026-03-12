import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engram Memory Decay Study | Terronex",
  description: "90-day empirical study of semantic memory decay in Engram — how AI memories age through HOT, WARM, COLD, and ARCHIVE tiers over time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
