import { PrismaClient } from ".prisma/client";
import { ProviderType } from "src/@types";

const prisma = new PrismaClient();


class Provider {

  async getProvider() {
    try {
      const allProvider = await prisma.provider.findMany({
        include: {
          user: true,
          Services: true,
          Appointments: true,
        },
      });

      return allProvider;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async createProvider(Provider: ProviderType) {
    try {

      const { name, address, contact, userId } = Provider;
     
      return await prisma.provider.create({
        data: { name, address, contact,  userId } as any,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Provider();
