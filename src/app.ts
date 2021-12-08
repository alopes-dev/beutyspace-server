require("dotenv").config();
import express, {Response,Request,NextFunction} from 'express';
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes";

import morgan from "morgan";
const app = express();
import cors from "cors";
import path = require("path");

// import {
//   graphqlSetup,
//   dbConnection,
//   createErrorHandler,
//   errorHandler,
// } from "./setup";

const port = process.env.PORT || "5500";

app.use(cors({ origin: true, credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cookieParser());

app.use(routes);

app.set("port", port);

app.use((err:Error, request:Request, response:Response, next:NextFunction) => {
  if(err instanceof Error)
  {
    return response.status(400).json({ 
      error : err.message
    })
  }
  return response.status(500).json({
    status :"error",
    message :"Internal Server Error",
  })
})

app.listen(port);

module.exports = app;
