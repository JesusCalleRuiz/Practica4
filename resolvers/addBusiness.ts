import { Request, Response } from "npm:express@4.18.2";
import EmpresaModel from "../db/empresa.ts";

const addBusiness = async (req: Request, res: Response) => {
  try {
    const { nombre, codPostal } = req.body;
    if (!nombre || !codPostal) {
      res.status(400).send("Nombre and codPostal are required");
      return;
    }

    const newBusiness = new EmpresaModel({ nombre, codPostal });
    await newBusiness.save();

    res.status(200).send({
      nombre: newBusiness.nombre,
      codPostal : newBusiness.codPostal,
      id: newBusiness._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addBusiness;