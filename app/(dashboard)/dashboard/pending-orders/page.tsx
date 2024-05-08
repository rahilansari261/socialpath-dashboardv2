import BreadCrumb from "@/components/breadcrumb";
import { PendingOrdersTable } from "@/components/tables/pending-orders-table/client";



const breadcrumbItems = [
  { title: "Pending Orders", link: "/dashboard/pending-orders" },
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <PendingOrdersTable />
      </div>
    </>
  );
}
