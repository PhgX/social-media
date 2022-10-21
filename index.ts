import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { router } from "./src/router/routes";
import { errorHandler } from "./src/middleware/error";
const app = express();
//middle
dotenv.config();
app.use(cors());

// connection
const DB_URL = `mongodb://localhost:27017/md5`;
mongoose.connect(DB_URL).then(() => {
  console.log("DB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`DB Connected error: ${err.message}`);
});
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
// app.use(errorHandler);

app.use("", router);

// app.use(errorHandler);
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log("sever is running port ", port);
});
