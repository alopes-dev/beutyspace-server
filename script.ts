import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const allUsers = await prisma.user.findMany();
  // use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null });
  await prisma.user.create({
    data: {
      role: "PROVIDER",
      email: "antonio.lopes@gmail.com",
      password: "password",
      password_hash: "password",
      avatar: "http://asha",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
