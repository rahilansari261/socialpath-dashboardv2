"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Order } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "created_at",
    header: "DATE ",
  },
  {
    accessorKey: "pricing_plan",
    header: "PRICING PLAN",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      // Render a Badge component with the status value
      const variant =
        row.original.status === "pending"
          ? "default"
          : row.original.status === "rejected"
          ? "destructive"
          : row.original.status === "accepted"
          ? "secondary"
          : "secondary";

      return <Badge variant={variant}>{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}</Badge>;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
