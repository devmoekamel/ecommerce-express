import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import  products  from "./routes/product.js";
import  Users  from "./routes/user.js";
import { connectDB } from "./config/db.js";

const app = express();
const env = configDotenv({
  path: "./config/config.env",
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/products",products);
app.use("/api/v1/users",Users);
// app.use("/api/v1/product",)

app.listen(3000, () => {
  try {
    connectDB();
    console.log("server running on  port: 3000 ");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
