import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Provider from "@services/ProviderServices";


const prisma = new PrismaClient();

class ProviderController {

  
  async index(req: Request, res: Response): Promise<any> {

    const provider = await Provider.getProvider();

    return res.json(provider);
  }

  async store(req: Request, res: Response) {
   
    try {
      const {  name, address, contact, userId } = req.body;

      const Providers = await Provider.createProvider({ name, address, contact, userId});

      return res.json(Providers);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
export default new ProviderController();

/**
 * {
  "input": {
    "object": {
      "websiteId": "cbb4c527-39b4-48c1-8a72-a9cb531380ec",
      "startDate": "2021-01-18T01:00:00.000Z",
      "endDate": "2021-12-08T01:00:00.000Z"
    }
  }  
}
 */