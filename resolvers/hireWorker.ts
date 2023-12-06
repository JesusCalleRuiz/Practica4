import { Request, Response } from "npm:express@4.18.2";
import EmpresaModel from "../db/empresa.ts";
import TrabajadorModel from "../db/trabajador.ts";

const hireWorker = async (req: Request, res: Response) => {
  try {
    const { id, workerId } = req.params;

    const empresa = await EmpresaModel.findById(id);
    if (!empresa) {
      res.status(404).send("Empresa not found");
      return;
    }

    const trabajador = await TrabajadorModel.findById(workerId);
    if (!trabajador) {
      res.status(404).send("Trabajador not found");
      return;
    }

    if (empresa.trabajadores.length >= 10) {
      res.status(400).send("La empresa tiene el maximo de trabajdores permitidos");
      return;
    }

    trabajador.empresa = empresa._id;
    await trabajador.save();

    empresa.trabajadores.push(trabajador._id);
    await empresa.save();

    res.status(200).send("Trabajador contratado");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default hireWorker;