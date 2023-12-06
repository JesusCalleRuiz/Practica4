import mongoose from "npm:mongoose@7.6.3";
import { Tarea } from "../types.ts";
import { Estados } from "../types.ts";

const Schema = mongoose.Schema;

const tareaSchema = new Schema(
  {
    estados: {type: String, enum: Object.values(Estados), required: true },
    trabajador: { type: mongoose.Schema.Types.ObjectId, ref: 'Trabajador' },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' }
  },
  { timestamps: true }
);

tareaSchema.pre("remove", async function (next) {
  await mongoose.model("Trabajador").updateOne({ _id: this.trabajador }, { $pull: { tareas: this._id } });
  await mongoose.model("Empresa").updateOne({ _id: this.empresa }, { $pull: { tareas: this._id } });
  next();
});

tareaSchema.pre(/^find/, function (next) {
  this.populate("trabajador", "id nombre apellidos");
  this.populate("empresa", "id nombre codPostal");
  next();
});

export type tareaModelType = mongoose.Document & Omit<Tarea, "id">;

export default mongoose.model<tareaModelType>("Tarea", tareaSchema);