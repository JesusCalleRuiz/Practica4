import { Request, Response } from "npm:express@4.18.2";
import BusinessModel from "../db/empresa.ts";

const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const business = await BusinessModel.findOneAndDelete({ _id: id }).exec();
    if (!business) {
      res.status(404).send("Business not found");
      return;
    }
    res.status(200).send("Business deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteBusiness;