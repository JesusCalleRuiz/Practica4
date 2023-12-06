import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getWorker from "./resolvers/getWorker.ts";
import addWorker from "./resolvers/addWorker.ts";
import addBusiness from "./resolvers/addBusiness.ts";
import addTask from "./resolvers/addTask.ts";
import fireWorker from "./resolvers/fireWorker.ts";
import getBusiness from "./resolvers/getBusiness.ts";
import getTask from "./resolvers/getTask.ts";
import getTasks from "./resolvers/getTasks.ts";
import deleteWorker from "./resolvers/deleteWorker.ts";
import deleteBusiness from "./resolvers/deleteBusiness.ts";
import deleteTask from "./resolvers/deleteTask.ts";
import hireWorker from "./resolvers/hireWorker.ts";
import changeStatus from "./resolvers/changeStatus.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";


const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/worker/:id", getWorker)
  .get("/business/:id", getBusiness)
  .get("/task/:id", getTask)
  .get("/worker", getTasks)
  .get("/business", getBusiness)
  .get("/task", getTasks)
  .post("/worker", addWorker)
  .post("/business", addBusiness)
  .post("/task", addTask)
  .delete("/worker/:id", deleteWorker)
  .delete("/business/:id", deleteBusiness)
  .delete("/task/:id", deleteTask)
  .put("/business/:id/fire/:workerId",fireWorker)
  .put("/business/:id/hire/:workerId", hireWorker)
  .put("/task/:id?status=x",changeStatus)


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});