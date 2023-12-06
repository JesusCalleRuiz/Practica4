import mongoose from "npm:mongoose@7.6.3";
import { Empresa } from "../types.ts";

const Schema = mongoose.Schema;

const empresaSchema = new Schema(
  {
    codPostal:{ type: Number, required: true,unique: true },
    nombre: { type: String, required: true },
    trabajadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trabajador' }]
  },
  { timestamps: true }
);

empresaSchema.pre("remove", async function (next) {
  await mongoose.model("Trabajador").updateMany({ empresa: this._id }, { $unset: { empresa: "" } });
  next();
});

empresaSchema.pre(/^find/, function (next) {
  this.populate("trabajadores", "id nombre apellidos dni email telefono");
  next();
});

export type empresaModelType = mongoose.Document & Omit<Empresa, "id">;

export default mongoose.model<empresaModelType>("Empresa", empresaSchema);