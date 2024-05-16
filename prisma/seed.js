const { PrismaClient, userRole } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedAdmin() {
  // Create a new user
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: userRole.admin,
    },
  });
  if (existingAdmin) {
    return;
  }
  const hashedPassword = await bcrypt.hash("admin@1234", 10);
  await prisma.user.create({
    data: {
      name: "Admin ",
      username: "admin",
      role: userRole.admin,
      email: "admin@gmail.com",
      phone: "7894561230",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

// async function seedOrder() {
//   // Check if orders already exist
//   const existingOrders = await prisma.order.findMany();
//   if (existingOrders.length > 0) {
//     return;
//   }
//   const ordersData = [
//     {
//       name: "Order 1",
//       pricing_plan: "Basic",
//       status: order_status.pending,
//       userId: "6641b9ec9ecb527a1189922a", // Assign user ID based on your actual data
//       created_at: new Date(),
//     },
//     {
//       name: "Order 2",
//       pricing_plan: "Premium",
//       status: order_status.accepted,
//       userId: "6641b9ec9ecb527a1189922b", // Assign user ID based on your actual data
//       created_at: new Date(),
//     },
//     // Add more orders as needed
//   ];

//   // Seed orders
//   await Promise.all(
//     ordersData.map(async (order) => {
//       await prisma.order.create({
//         data: order,
//       });
//     })
//   );
// }

// const users = [
//   {
//     id: 1,
//     name: "Candice Schiner",
//     phone: "6234567890",
//     pricing_plan: "Basic",
//     email: "candice.schiner@example.com",
//     city: "New York City",
//     instagram_id: "@candiceschiner",
//     created_at: "01-01-2024",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     created_at: "01-01-2024",
//     pricing_plan: "Diamond",
//     phone: "7654321098",
//     email: "johndoe@example.com",
//     city: "New Delhi",
//     instagram_id: "@johndoe",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     created_at: "01-01-2024",
//     pricing_plan: "Basic",
//     phone: "8876543219",
//     email: "alicejohnson@example.com",
//     city: "Bangalore",
//     instagram_id: "@alicejohnson",

//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "David Smith",
//     phone: "9976543218",
//     email: "davidsmith@example.com",
//     instagram_id: "@davidsmith",
//     city: "Mumbai",
//     created_at: "01-01-2024",
//     pricing_plan: "Premium",
//     status: "Inactive",
//   },
//   {
//     id: 5,
//     name: "Emma Wilson",
//     created_at: "01-01-2024",
//     pricing_plan: "Basic",
//     phone: "6785432198",
//     email: "emmawilson@example.com",
//     instagram_id: "@emmawilson",
//     city: "Chennai",
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "James Brown",
//     created_at: "01-01-2024",
//     pricing_plan: "Basic",
//     phone: "9845632198",
//     email: "jamesbrown@example.com",
//     city: "Hyderabad",
//     instagram_id: "@jamesbrown",

//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Laura White",
//     created_at: "01-01-2024",
//     pricing_plan: "Gold",
//     phone: "7865432198",
//     email: "laurawhite@example.com",
//     city: "Kolkata",
//     instagram_id: "@laurawhite",

//     status: "Active",
//   },
//   {
//     id: 8,
//     name: "Michael Lee",
//     created_at: "01-01-2024",
//     pricing_plan: "Core",
//     phone: "8754321876",
//     email: "michaellee@example.com",
//     instagram_id: "@michaellee",
//     city: "Pune",
//     status: "Active",
//   },
//   {
//     id: 9,
//     name: "Olivia Green",
//     created_at: "01-01-2024",
//     pricing_plan: "Basic",
//     phone: "9898765432",
//     email: "oliviagreen@example.com",
//     instagram_id: "@oliviagreen",
//     city: "Jaipur",

//     status: "Active",
//   },
//   {
//     id: 10,
//     name: "Robert Taylor",
//     created_at: "01-01-2024",
//     pricing_plan: "Elite",
//     phone: "9854328745",
//     email: "roberttaylor@example.com",
//     instagram_id: "@roberttaylor",
//     city: "Ahmedabad",
//     status: "Active",
//   },
// ];
// async function seedUser() {
//   try {
//     // Loop through each user and insert it into the database
//     for (const user of users) {
//       await prisma.user.create({
//         data: {
//           name: user.name,
//           role: userRole.user,
//           phone: user.phone,
//           email: user.email,
//           password: "12345678",

//           instagram_id: user.instagram_id,
//           city: user.city,
//           created_at: new Date(user.created_at),
//           updated_at: new Date(),
//         },
//       });
//     }
//   } catch (error) {

//     throw new Error(error);
//   } finally {
//     // Disconnect Prisma client
//     await prisma.$disconnect();
//   }
// }

// Call the seed function

const main = async () => {
  await seedAdmin();
  // await seedOrder();
  // await seedUser();
};

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
