import CheckoutPage from "@/components/orders/checkout-page";

export const metadata = {
  title: "Finaliser ma commande",
  description: "Choisissez une heure et indiquez où vous souhaitez recevoir votre plat maison.",
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
