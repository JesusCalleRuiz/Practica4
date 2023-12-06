import { Request, Response } from "npm:express@4.18.2";
import TaskModel from "../db/tarea.ts";
import { Estados } from "../types.ts";

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { x } = req.query;

    const tarea = await TaskModel.findById(id);
    if (!tarea) {
      res.status(404).send("Tarea not found");
      return;
    }

    if (!Object.values(Estados).includes(x as Estados)) {
      res.status(400).send("Estado no válido");
      return;
    }

    tarea.estado = x as Estados;
    await tarea.save();

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default changeStatus;