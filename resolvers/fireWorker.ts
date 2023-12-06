import { Request, Response } from "npm:express@4.18.2";
import EmpresaModel from "../db/empresa.ts";
import TrabajadorModel from "../db/trabajador.ts";

const fireWorker = async (req: Request, res: Response) => {
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

    empresa.trabajadores.pull(trabajador._id);
    await empresa.save();

    trabajador.empresa = undefined;
    await trabajador.save();

    res.status(200).send("Trabajador despedido");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default fireWorker;
