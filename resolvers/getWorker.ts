import { Request, Response } from "npm:express@4.18.2";
import TrabajadorModel from "../db/trabajador.ts";

const getWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajador = await TrabajadorModel.findOne({ _id: id}).exec();
    if (!trabajador) {
      res.status(404).send("Worker not found");
      return;
    }
    res.status(200).send({
      nombre: trabajador.nombre,
      apellidos: trabajador.apellidos,
      dni: trabajador.dni,
      telefono: trabajador.telefono,
      email: trabajador.email,
      empresa: trabajador.empresa,
      tareas: trabajador.tareas
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getWorker;