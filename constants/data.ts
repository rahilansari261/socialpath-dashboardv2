import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },

  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: "pendingOrders",
    label: "Orders",
  },

  // {
  //   title: "Confirm Orders",
  //   href: "/dashboard/confirm-orders",
  //   icon: "confirmOrders",
  //   label: "Confirm Orders",
  // },
  {
    title: "Pricing Plan",
    href: "/dashboard/pricing-plan",
    icon: "billing",
    label: "Pricing Plan",
  },
  {
    title: "Users",
    href: "/dashboard/user",
    icon: "users",
    label: "User",
  },
  // {
  //   title: "My Orders",
  //   href: "/dashboard/my-orders",
  //   icon: "confirmOrders",
  //   label: "My Orders",
  // },
  // {
  //   title: "Logout",
  //   icon: "logout",
  //   label: "logout",
  //   func: signOut;

  // },
];
