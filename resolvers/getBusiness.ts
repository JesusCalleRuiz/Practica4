import { Request, Response } from "npm:express@4.18.2";
import EmpresaModel from "../db/empresa.ts";

const getBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empresa = await EmpresaModel.findOne({ _id: id}).exec();
    if (!empresa) {
      res.status(404).send("Business not found");
      return;
    }
    res.status(200).send({
      nombre: empresa.nombre,
      codPostal: empresa.codPostal,
      trabajadores: empresa.trabajadores
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getBusiness;