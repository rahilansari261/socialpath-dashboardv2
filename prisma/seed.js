const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: "accepted",
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: "pending",
    },
  ];

  // Insert data into the 'orders' collection
  for (const item of data) {
    await prisma.order.create({
      data: item,
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
