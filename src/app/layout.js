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
    default: "Dar Matbakh — Cuisine maison au Maroc",
    template: "%s | Dar Matbakh",
  },
  description:
    "Découvrez les plats faits maison par les cuisinières et cuisiniers de votre quartier.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-MA" className={josefinSans.variable}>
      <body><OrderProvider>{children}</OrderProvider></body>
    </html>
  );
}
