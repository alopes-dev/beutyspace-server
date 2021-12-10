import { PrismaClient } from ".prisma/client";
import { AppointmentsType } from "src/@types";

const prisma = new PrismaClient();


class Appointments {

  async getappointments() {
    try {
      const allappointments = await prisma.appointments.findMany({
        include: {
          client: true,
        },
      });

      return allappointments;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async createappointments(appointments: AppointmentsType) {
    try {

      const { date, canceledAt, password, password_hash,clientId,providerId } = appointments;
     
      return await prisma.appointments.create({
        data: {  date, canceledAt, password, password_hash,clientId,providerId } as any,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Appointments();
