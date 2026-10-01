import "./globals.css";
import { OrderProvider } from "@/context/order-context";

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
    <html lang="fr-MA">
      <body><OrderProvider>{children}</OrderProvider></body>
    </html>
  );
}
