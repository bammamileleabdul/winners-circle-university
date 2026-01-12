import "./globals.css";

export const metadata = {
  title: "Winners Circle University",
  description: "Performance-based gold trading framework",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="siteFooter">
          <div className="siteFooterInner">
            <div className="siteFooterBrand">© {new Date().getFullYear()} Winners Circle University</div>
            <div className="siteFooterLinks">
              <a href="/terms">Terms</a>
              <span className="dot">•</span>
              <a href="/privacy">Privacy</a>
              <span className="dot">•</span>
              <a href="/support">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
