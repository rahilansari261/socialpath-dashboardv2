import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  pricing_plan: string;
  created_at: string;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    pricing_plan: "Basic",
    created_at: "01-01-2024",
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    created_at: "01-01-2024",
    pricing_plan: "Diamond",
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    created_at: "01-01-2024",
    pricing_plan: "Basic",
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    created_at: "01-01-2024",
    pricing_plan: "Premium",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    created_at: "01-01-2024",
    pricing_plan: "Basic",
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    created_at: "01-01-2024",
    pricing_plan: "Basic",
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    created_at: "01-01-2024",
    pricing_plan: "Gold",
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    created_at: "01-01-2024",
    pricing_plan: "Core",
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    created_at: "01-01-2024",
    pricing_plan: "Basic",
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    created_at: "01-01-2024",
    pricing_plan: "Elite",
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },

  {
    title: "Pending Orders",
    href: "/dashboard/pending-orders",
    icon: "pendingOrders",
    label: "Pending Orders",
  },

  {
    title: "Confirm Orders",
    href: "/dashboard/confirm-orders",
    icon: "confirmOrders",
    label: "Confirm Orders",
  },
  {
    title: "Pricing Plan",
    href: "/dashboard/pricing-plan",
    icon: "billing",
    label: "Pricing Plan",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Logout",
    href: "/",
    icon: "logout",
    label: "logout",
  },
];
