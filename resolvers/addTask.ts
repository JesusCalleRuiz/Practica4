import { Request, Response } from "npm:express@4.18.2";
import TaskModel from "../db/tarea.ts";
import WorkerModel from "../db/trabajador.ts"
import { Estados } from "../types.ts";

const addTask = async (req: Request, res: Response) => {
  try {
    const { trabajadorId } = req.body;
    const trabajador = await WorkerModel.findById(trabajadorId);
    
    if (!trabajador) {
      res.status(400).send("Worker are required");
      return;
    }

    const newTask = new TaskModel({ trabajador});
    await newTask.save();

    res.status(200).send({
      estados : Estados.TODO,
      trabajador: newTask.trabajador,
      empresa : newTask.trabajador.empresa,
      id: newTask._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addTask;