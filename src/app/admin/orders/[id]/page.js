import { AdminOrderDetails } from "@/components/admin/admin-orders";

export default async function AdminOrderRoute({ params }) {
  const { id } = await params;
  return <AdminOrderDetails orderId={id} />;
}
