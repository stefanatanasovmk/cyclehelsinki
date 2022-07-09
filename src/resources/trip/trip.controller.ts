import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import TripService from "./trip.service";

export default class TripController implements Controller {
  public path = "/trip";
  public router = Router();
  public Tripservice = new TripService();

  constructor() {
    this.initializeRouter();
  }

  //Defining & initializing all the routes for trips API
  private initializeRouter() {
    this.router.get(`${this.path}/getone/:id`, this.getOne);
    this.router.get("/err", this.err);
  }
  private err = async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error();
    } catch {
      next(new Error());
    }
  };

  //Controller for fetching one Trip in the database with given the ID of the trip as a param.
  private getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const trip = await this.Tripservice.getOne(id);
      res.status(200).json(trip);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };
}
