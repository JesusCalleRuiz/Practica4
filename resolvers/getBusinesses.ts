import { Request, Response } from "npm:express@4.18.2";
import BusinessModel from "../db/empresa.ts";

const getBusinesses = async (req: Request, res: Response) => {
  try {
    const business = await BusinessModel.find().exec();
    if (!business) {
      res.status(404).send("Business not found");
    return;
    }

    const businessList = business.map((empresa) => ({
        nombre: empresa.nombre,
        codPostal: empresa.codPostal,
        trabajadores: empresa.trabajadores
    }));

    res.status(200).send(businessList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getBusinesses;