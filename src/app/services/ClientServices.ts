import { PrismaClient } from ".prisma/client";
import { ClientType } from "src/@types";
const prisma = new PrismaClient();
import Users from "@services/UserServices";

class Client {
  
  async getClient() {
    try {
      const allClient = await prisma.client.findMany({
        include: {
          user: true,
          Appointments: true,
        },
      });

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
      
      const response = await Users.createUser(user);
      const userId = response.id;
      
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
