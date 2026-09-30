import "./globals.css";
import FxLayer from "../components/FxLayer";

export const metadata = {
  title: "Winners Circle University",
  description: "Copy a disciplined gold trading strategy through Exness Social Trading.",
};

export const viewport = {
  themeColor: "#07060a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,500;0,600;0,700;1,600&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <FxLayer />
        {children}
        <footer className="siteFooter">
          <div className="siteFooterInner">
            <p className="siteFooterRisk">
              <b>Risk warning.</b> Trading forex and CFDs on margin is high risk and you can lose all of the money you
              invest. Copy trading does not remove that risk. Past performance does not guarantee future results.
              Nothing on this site is financial advice. For adults 18+ only.
            </p>
            <div className="siteFooterRow">
              <div className="siteFooterBrand">© {new Date().getFullYear()} Winners Circle University</div>
              <div className="siteFooterLinks">
                <a href="/terms">Terms</a>
                <span className="dot">•</span>
                <a href="/privacy">Privacy</a>
                <span className="dot">•</span>
                <a href="/support">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
