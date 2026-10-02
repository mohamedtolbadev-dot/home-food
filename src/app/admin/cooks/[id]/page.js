import { AdminCookDetails } from "@/components/admin/admin-cooks";

export default async function AdminCookRoute({ params }) {
  const { id } = await params;
  return <AdminCookDetails cookId={id} />;
}
