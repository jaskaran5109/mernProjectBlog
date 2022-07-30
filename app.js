import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes";
import router from "./routes/userRoutes";
import cors from "cors";
const app = express();
app.use(cors())
//middleware
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://admin:sKnproPfZTcVMdlw@blog.fpg9yok.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log(err));
