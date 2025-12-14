import "./globals.css";

export const metadata = {
  title: "Winners Circle University",
  description: "Performance-based gold trading. You pay only on profitable weeks."
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
