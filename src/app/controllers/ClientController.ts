import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Client from "@services/ClientServices";


const prisma = new PrismaClient();

class ClientController {

  
  async index(req: Request, res: Response): Promise<any> {

    const client = await Client.getClient();

    return res.json(client);
  }

  async store(req: Request, res: Response) {
   
    try {
      const { firstName, lastName, phone,user } = req.body;

      const client = await Client.createClient({firstName, lastName, phone,user});

      return res.json(client);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
export default new ClientController();