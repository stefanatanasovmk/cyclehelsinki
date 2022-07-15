import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import TripService from "./trip.service";
import { tripValidator, ValidateSchema } from "../../middleware/dataValidator";
import mongoose from "mongoose";

export default class TripController implements Controller {
  public path = "/trip";
  public router = Router();
  public TripService = new TripService();

  constructor() {
    this.initializeRouter();
  }

  //Defining & initializing all the routes for trips API
  private initializeRouter() {
    this.router.get(`${this.path}/getone/:id`, this.getOne);
    this.router.get(
      `${this.path}/getonewithstations/:id`,
      this.getOneWithStations
    );
    this.router.get(`${this.path}`, this.getAll);
    this.router.post(
      `${this.path}/addtrip`,
      tripValidator(ValidateSchema.trip),
      this.addTrip
    );
  }

  //Controller for fetching one Trip in the database with given the ID of the trip as a param.
  private getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        res.status(404).json({ message: "The provided ID is not valid" });
      } else {
        const trip = await this.TripService.getOne(id);
        res.status(200).json(trip);
      }
    } catch {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controler for fetching one Trip in the database which return the trip, the departure station and the station where the trip has ended, with given the ID of the trip as a param
  private getOneWithStations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        res.status(404).json({ message: "The provided ID is not valid" });
      } else {
        const trip = await this.TripService.getOneWithStations(id);
        res.status(200).json(trip);
      }
    } catch {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controller for fetching all the trips, with implemented pagination, it accept page number and limit of how much trips you would like to show on a page, as a number
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const trips = await this.TripService.getAll(+page, +limit);
      res.status(200).json(trips);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };

  //Controller for creating a new trip
  private addTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [status, trip] = await this.TripService.addTrip(req.body);
      res.status(status).json(trip);
    } catch {
      next(new HttpError(500, "Something went kaboom, please try again"));
    }
  };

  
}
