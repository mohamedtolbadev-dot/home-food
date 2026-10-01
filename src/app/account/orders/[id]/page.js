import OrderDetailPage from "@/components/account/order-detail-page";

export default async function AccountOrderDetailRoute({ params }) {
  const { id } = await params;
  return <OrderDetailPage orderId={id} />;
}