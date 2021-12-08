import { Router } from "express";
import UserController from "./app/controllers/userController";
import ClientController from "./app/controllers/ClientController";



const routes = Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);


routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.store);

export default routes;
