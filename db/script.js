import { prisma } from "../lib/prisma.js";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      firstName: "Mr",
      lastName: "Mine",
      username: "m@m.net",
      password: "123",
    },
  });
  console.log("Created user:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
