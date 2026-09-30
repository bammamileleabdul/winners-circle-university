import { redirect } from "next/navigation";

// The old "Access & Trading" page is replaced by /copy-trading.
export default function AccessTradingRedirect() {
  redirect("/copy-trading");
}
