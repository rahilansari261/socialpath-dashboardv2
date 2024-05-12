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
      role: userRole.admin,
      email: "admin@gmail.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

const main = async () => {
  await seedAdmin();
};

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
