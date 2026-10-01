import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import { OrderProvider } from "@/context/order-context";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "دار مطبخ — ماكلة الدار فالمغرب",
    template: "%s | دار مطبخ",
  },
  description: "شوف الماكلة ديال الدار لي كيوجدوها الطباخات والطباخين حداك.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar-MA" dir="rtl" className={josefinSans.variable}>
      <body><OrderProvider>{children}</OrderProvider></body>
    </html>
  );
}
