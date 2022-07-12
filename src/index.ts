import App from "./app";
import StationController from "./resources/station/station.controller";
import TripController from "./resources/trip/trip.controller";
import "dotenv/config";

//Initializing of the App class, it requres all the Controllers and the PORT which is defined in the .env file in the root directory.
const app = new App(
  [new TripController(), new StationController()],
  Number(process.env.PORT)
);
app.listen();
