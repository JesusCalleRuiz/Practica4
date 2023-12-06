import { Request, Response } from "npm:express@4.18.2";
import TaskModel from "../db/tarea.ts";

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find().exec();
    if (!tasks) {
      res.status(404).send("Tasks not found");
    return;
    }

    const taskList = tasks.map((tarea) => ({
      empresa: tarea.empresa,
      estados: tarea.estado,
      trabajador: tarea.trabajador
    }));

    res.status(200).send(taskList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getTasks;