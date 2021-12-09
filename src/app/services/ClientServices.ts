import { PrismaClient } from ".prisma/client";
import { ClientType } from "src/@types";
const prisma = new PrismaClient();
import Users from "@services/UserServices";
class Client {
  async getClient() {
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
      const { firstName, lastName, phone, user } = client;
      console.log(client);

      const response = await Users.createUser(user);
      const userId = response.id;
      console.log(userId);
      return await prisma.client.create({
        data: { firstName, lastName, phone,  userId } as any,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Client();
