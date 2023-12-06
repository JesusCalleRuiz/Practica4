import { Request, Response } from "npm:express@4.18.2";
import TaskModel from "../db/tarea.ts";

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findOneAndDelete({ _id: id }).exec();
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteTask;