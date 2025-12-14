import "./globals.css";

export const metadata = {
  title: "Winners Circle University",
  description:
    "Performance-based gold trading framework with disciplined execution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
