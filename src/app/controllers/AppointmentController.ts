import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Appointments from "@services/AppointmentServices";


const prisma = new PrismaClient();

class AppointmentController {

  
  async index(req: Request, res: Response): Promise<any> {

    const appointments = await Appointments.getappointments();

    return res.json(appointments);
  }

  async store(req: Request, res: Response) {
   
    try {
      const {  date, canceledAt, password, password_hash,clientId,providerId } = req.body;

      const appointments = await Appointments.createappointments({ date, canceledAt, password, password_hash,clientId,providerId});

      return res.json(appointments);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
export default new AppointmentController();