import { Router } from "express";
import UserController from "./app/controllers/userController";
import ClientController from "./app/controllers/ClientController";
import ProviderController from "./app/controllers/ProviderController";
import ServicesController from "./app/controllers/ServicesController";
import AppointmentController from "./app/controllers/AppointmentController";


const routes = Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);


routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.store);

routes.get("/Provider", ProviderController.index);
routes.post("/Provider", ProviderController.store);

routes.get("/services", ServicesController.index);
routes.post("/services", ServicesController.store);

routes.get("/appointment", AppointmentController.index);
routes.post("/appointment", AppointmentController.store);

export default routes;
