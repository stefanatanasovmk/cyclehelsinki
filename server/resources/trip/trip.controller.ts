import { Router, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import TripService from "./trip.service";
import {
  validator,
  ValidateSchema,
} from "../../middleware/dataValidator.middleware";

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
      validator(ValidateSchema.trip),
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
        res.status(500).json({ message: "The provided ID is not valid" });
      } else {
        const [status, trip] = await this.TripService.getOne(id);
        res.status(status).json(trip);
      }
    } catch {
      next(new HttpError(500, "We couldn't get the trip, please try again"));
    }
  };

  //This route is not in use currently
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
        res.status(500).json({ message: "The provided ID is not valid" });
      } else {
        const [status, tripAndStations] =
          await this.TripService.getOneWithStations(id);
        res.status(status).json(tripAndStations);
      }
    } catch {
      next(new HttpError(500, "We couldn't get the trip and the stations, please try again"));
    }
  };

  //Controller for fetching all the trips, with implemented pagination, it accept page number and limit of how much trips you would like to show on a page, as a number
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const defaultFrom = new Date("2021-01-01").getTime();
      const defaultUntil = Date.now();
      const {
        page = 1,
        limit = 20,
        from = defaultFrom,
        until = defaultUntil,
        filterby = "return",
      } = req.query;
      if (typeof filterby !== "string") {
        res
          .status(500)
          .json({ message: "You need to choose how to filter the trips" });
      } else {
        const [status, trips] = await this.TripService.getAll(
          +page,
          +limit,
          +from,
          +until,
          filterby
        );
        res.status(status).json(trips);
      }
    } catch {
      next(new HttpError(500, "We couldn't get the stations, please try again"));
    }
  };

  //Controller for creating a new trip
  private addTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [status, trip] = await this.TripService.addTrip(req.body);
      res.status(status).json(trip);
    } catch {
      next(new HttpError(500, "We couldn't add the trip, please try again"));
    }
  };
}
