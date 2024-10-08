"use client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";

// import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "name",
  //   header: "NAME",
  // },
  {
    accessorKey: "username",
    header: "USERNAME",
  },
  // {
  //   accessorKey: "phone",
  //   header: "PHONE",
  // },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "pricing_plan",
    header: "PRICING PLAN",
  },
  {
    accessorKey: "city",
    header: "CITY",
  },
  {
    accessorKey: "instagram_id",
    header: "INSTAGRAM ID",
  },
  // {
  //   accessorKey: "created_at",
  //   header: "DATE ",
  // },
  // {
  //   accessorKey: "pricing_plan",
  //   header: "PRICING PLAN",
  // },
  // {
  //   accessorKey: "status",
  //   header: "STATUS",
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
