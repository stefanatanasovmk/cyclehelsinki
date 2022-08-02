import { config } from "dotenv";
config({ path: "../../.env" }); //you will need here to specify the path of your .env file, relative to this directory
import mongoose from "mongoose";
import insertTrip from "./insertTrip";

//In insertTripsFunction as an argument specify the path that is relative to this directory of the trips csv file that you want to save in the database.

const mongoDbPath = process.env.MONGO_DB_PATH;

insertTrip("../../csv-files/2021-05.csv");

mongoose.connect(`${mongoDbPath}`);
