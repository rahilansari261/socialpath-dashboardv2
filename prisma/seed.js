const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Candice Schiner",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "John Doe",
      pricing_plan: "Diamond",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Alice Johnson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "David Smith",
      pricing_plan: "Premium",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Emma Wilson",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "James Brown",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Laura White",
      pricing_plan: "Gold",
      created_at: new Date("2024-01-01"),
      status: false,
    },
    {
      name: "Michael Lee",
      pricing_plan: "Core",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Olivia Green",
      pricing_plan: "Basic",
      created_at: new Date("2024-01-01"),
      status: true,
    },
    {
      name: "Robert Taylor",
      pricing_plan: "Elite",
      created_at: new Date("2024-01-01"),
      status: false,
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
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
