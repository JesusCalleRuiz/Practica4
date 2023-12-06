import { Request, Response } from "npm:express@4.18.2";
import TareaModel from "../db/tarea.ts";

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await TareaModel.findOne({ _id: id}).exec();
    if (!tarea) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send({
      empresa: tarea.empresa,
      estados: tarea.estado,
      trabajador: tarea.trabajador
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getTask;