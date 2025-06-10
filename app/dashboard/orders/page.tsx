import { getUserOrders } from "@/app/_lib/data";
import AdminOrdersPage from "@/components/ui/Orders";

export default async function Page() {
  const orders = await getUserOrders();

  return (
    <div>
      <AdminOrdersPage orders={orders} />
    </div>
  );
}
