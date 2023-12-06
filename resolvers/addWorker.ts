import { Request, Response } from "npm:express@4.18.2";
import TrabajadorModel from "../db/trabajador.ts";

const addWorker = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos,dni,email,telefono } = req.body;
    if (!nombre || !dni|| !apellidos|| !email|| !telefono) {
      res.status(400).send("Nombre, dni, apellidos, email, telefono are required");
      return;
    }

    const newWorker = new TrabajadorModel({ nombre, apellidos,dni,email,telefono });
    await newWorker.save();

    res.status(200).send({
      nombre: newWorker.nombre,
      apellidos: newWorker.apellidos,
      dni: newWorker.dni,
      email: newWorker.email,
      telefono: newWorker.nombre,
      empresa: newWorker.empresa,
      tareas: newWorker.tareas,
      id: newWorker._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addWorker;