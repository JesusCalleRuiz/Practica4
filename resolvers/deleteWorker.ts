import { Request, Response } from "npm:express@4.18.2";
import WorkerModel from "../db/trabajador.ts";

const deleteWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const worker = await WorkerModel.findOneAndDelete({ _id: id }).exec();
    if (!worker) {
      res.status(404).send("Worker not found");
      return;
    }
    res.status(200).send("Worker deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteWorker;