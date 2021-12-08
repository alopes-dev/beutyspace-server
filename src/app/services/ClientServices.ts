import { PrismaClient } from ".prisma/client";
import { ClientType } from "src/@types";
const prisma = new PrismaClient();


class Client {
  async getClient(){
    try {
      const allClient = await prisma.client.findMany();
      return allClient;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async createClient(client: ClientType) {
    try {

      const { firstName, lastName, phone,user } = client;

      return await prisma.client.create({
        data: {firstName, lastName, phone, user:{create:{user}}} as any,
      });

    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Client();
