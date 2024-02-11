//start our project
import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handing CORS POLICY
// option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// option 2: Allow Custom Origins
//app.use(
//  cors({
//    origin: "http://localhost:3000",
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    allowedHeaders: ["Content-Type"],
//  })
//);

//create route for URL
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome !");
});

// Middleware for slash books
app.use("/books", booksRoute);

//use mongoose to connect Data Base and add URL
mongoose
  .connect(mongoDBURL)
  //.then and .catch structure
  // to handle different situations of success and failure
  .then(() => {
    console.log("App conected to database");
    //check server is runing
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    }); // in console is (App is listening to port: 5555)
  })
  .catch((error) => {
    console.log(error);
  });
