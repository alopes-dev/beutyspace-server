import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Services from "@services/ServicesServices";


const prisma = new PrismaClient();

class ServicesController {

  
  async index(req: Request, res: Response): Promise<any> {

    const provider = await Services.getProvider();

    return res.json(provider);
  }

  async store(req: Request, res: Response) {
   
    try {
      const {   name, imgCode, hallId } = req.body;

      const Providers = await Services.createProvider({  name, imgCode, hallId});

      return res.json(Providers);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
export default new ServicesController();