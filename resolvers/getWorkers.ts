import { Request, Response } from "npm:express@4.18.2";
import TrabajadorModel from "../db/trabajador.ts";

const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await TrabajadorModel.find().exec();
    if (!workers) {
      res.status(404).send("Worker not found");
    return;
    }

    const workerList = workers.map((trabajador) => ({
        nombre: trabajador.nombre,
        apellidos: trabajador.apellidos,
        dni: trabajador.dni,
        telefono: trabajador.telefono,
        email: trabajador.email,
        empresa: trabajador.empresa,
        tareas: trabajador.tareas
    }));

    res.status(200).send(workerList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getWorkers;