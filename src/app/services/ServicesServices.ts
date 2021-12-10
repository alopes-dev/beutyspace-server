import { PrismaClient } from ".prisma/client";
import { ServicesType } from "src/@types";

const prisma = new PrismaClient();


class Services {

  async getProvider() {
    try {
      const allServices = await prisma.services.findMany({
        include: {
          provider: true,
        },
      });

      return allServices;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async createProvider(services: ServicesType) {
    try {

      const { name, imgCode, hallId } = services;
     
      return await prisma.services.create({
        data: { name, imgCode, hallId } as any,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Services();
