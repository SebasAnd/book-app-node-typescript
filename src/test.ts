const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const result = await prisma.$queryRaw`SELECT * FROM USER`
  console.log(result)

}


main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })