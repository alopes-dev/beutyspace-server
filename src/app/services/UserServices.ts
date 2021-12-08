import { PrismaClient } from ".prisma/client";
import { UserType } from "src/@types";
import * as Yup from "yup";
const prisma = new PrismaClient();



class UserServices {
  async getUsers(){
    try {
      const allUsers = await prisma.user.findMany();
      return allUsers;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async createUser(user: UserType) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        role: Yup.string().required(),
      });
      const { email, password, role } = user;

      if (!(await schema.isValid(user))) {
        throw new Error("Validation fails");
      }

      const userExists = await prisma.user.findFirst({
        where: { email },
      });

      if (userExists) {
        throw new Error("User already exists.");
      }

      return await prisma.user.create({
        data: { email, password, role, } as any,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async putUser(user: UserType){

   
  }
}

export default new UserServices();
