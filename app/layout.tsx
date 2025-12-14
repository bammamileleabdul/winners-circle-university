import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Winners Circle University",
  description:
    "Performance-based gold trading powered by AI and disciplined execution.",
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
