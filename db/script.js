const { prisma } = require("../lib/prisma.js");

async function main() {
  // Create a new user with a post
  const user = await prisma.user.findUnique({
    where: { username: "m@.net" },
  });
  console.log("Found user:", user);
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
