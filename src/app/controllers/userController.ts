import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as Yup from "yup";

type User = {
  email: string;
  password: string;
  password_hash: string;
  role: string;
  avatar?: string;
};
const prisma = new PrismaClient();

class UserController {
  async index(req: Request, res: Response): Promise<any> {
    // const prisma = new PrismaClient();
    try {
      const allUsers = await prisma.user.findMany();
      return res.json(allUsers);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async store(req: Request, res: Response) {
    // const prisma = new PrismaClient();
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      role: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userExists = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    try {
      const { id, avatar, email, role } = await prisma.user.create({
        data: req.body,
      });

      return res.json({
        id,
        avatar,
        email,
        role,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { email, oldPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: { id: req.id },
    });

    if (email !== user?.email) {
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }
    }

    // if (oldPassword && !(await user.checkPassword(oldPassword))) {
    //   return res.status(401).json({ error: "Password does not match" });
    // }

    const { id, role } = await prisma.user.update(req.body);

    return res.json({
      id,
      email,
      role,
    });
  }
}

export default new UserController();
