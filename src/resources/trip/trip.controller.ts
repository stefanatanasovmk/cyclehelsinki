import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import TripService from "./trip.service";
import { tripValidator, ValidateSchema } from "../../middleware/dataValidator";
export default class TripController implements Controller {
  public path = "/trip";
  public router = Router();
  public tripService = new TripService();

  constructor() {
    this.initializeRouter();
  }

  //Defining & initializing all the routes for trips API
  private initializeRouter() {
    this.router.get(`${this.path}/getone/:id`, this.getOne);
    this.router.get(`${this.path}`, this.getAll);
    this.router.post(
      `${this.path}/addtrip`,
      tripValidator(ValidateSchema.trip),
      this.addTrip
    );
    this.router.get("/err", this.err);
  }
  //Only for testing the error messages
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
      const trip = await this.tripService.getOne(id);
      res.status(200).json(trip);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };

  //Controller for fetching all the trips, with implemented pagination, it accept page number and limit of how much trips you would like to show on a page, as a number
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const trips = await this.tripService.getAll(+page, +limit);
      res.status(200).json(trips);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };

  //Controller for creating a new trip
  private addTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trip = await this.tripService.addTrip(req.body);
      res.status(200).json(trip);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };
}
