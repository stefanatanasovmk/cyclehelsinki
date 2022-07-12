import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";
import "dotenv/config";

export default class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  //Here goes all the middlewares
  private initializeMiddlewares(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  //This is error handling middlewares
  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  //Here the routes in the controllers are initialized
  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use("/api", controller.router);
    });
    this.express.get("*", (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: "404 | This page doesn't exist" });
    });
  }

  //Database connection, MONGO_DB_PATH is assign in .env file, in the root directory
  private connectToDatabase(): void {
    const mongoDbPath = process.env.MONGO_DB_PATH;
    mongoose.connect(`${mongoDbPath}`);
  }

  //Server connection
  public listen() {
    return this.express.listen(this.port, () => {
      console.log(`The server is working on port ${this.port}`);
    });
  }
}
