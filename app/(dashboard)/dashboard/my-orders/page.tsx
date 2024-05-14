import BreadCrumb from "@/components/breadcrumb";

import { MyOrdersTable } from "@/components/tables/my-orders-table/client";

const breadcrumbItems = [{ title: "My Orders", link: "/dashboard/my-orders" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <MyOrdersTable />
      </div>
    </>
  );
}
