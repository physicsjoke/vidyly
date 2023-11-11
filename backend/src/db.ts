import { PrismaClient } from "@prisma/client";

// singleton ref when starting server
const DB: {
  prisma: PrismaClient;
} = {
  prisma: undefined as unknown as PrismaClient,
};

export const startPrismaClient = () => {
  DB.prisma = new PrismaClient();
};

export default DB;
