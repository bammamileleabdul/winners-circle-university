import "./globals.css";

export const metadata = {
  title: "Winners Circle University",
  description:
    "A performance-based gold trading framework combining advanced AI modelling with disciplined human market execution.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
