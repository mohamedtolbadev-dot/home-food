import AdminLayout from "@/components/admin/admin-shell";
import { AdminProvider } from "@/components/admin/admin-provider";

export default function AdminRootLayout({ children }) {
  return <AdminProvider><AdminLayout>{children}</AdminLayout></AdminProvider>;
}
