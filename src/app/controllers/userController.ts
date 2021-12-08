import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Users from "@services/UserServices";


const prisma = new PrismaClient();

class UserController {

  
  async index(req: Request, res: Response): Promise<any> {

    const users = await Users.getUsers();

    return res.json(users);
  }

  async store(req: Request, res: Response) {
   
    try {
      const { password, email, role } = req.body;

      const user = await Users.createUser({ password, email, role } )

      return res.json(user);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await Users.putUser({ id, email, role });

    return res.json(user);
  }
}

export default new UserController();