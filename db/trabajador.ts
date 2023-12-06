import mongoose from "npm:mongoose@7.6.3";
import { Trabajador } from "../types.ts";

const Schema = mongoose.Schema;

const trabajadorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    dni:{ type: String, required: true,unique: true },
    telefono:{ type: Number, required: true },
    email: { type: String, required: true },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }],
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' }
  },
  { timestamps: true }
);

trabajadorSchema.pre("remove", async function (next) {
  await mongoose.model("Tarea").deleteMany({ _id: { $in: this.tareas } });
  next();
});

trabajadorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tareas",
    select: "id estado",
    populate: {
      path: "trabajador",
      select: "id nombre apellidos"
    }
  }).populate("empresa", "id nombre codPostal");
  next();
});

trabajadorSchema.path("email").validate(async function (value) {
  const emailCount = await this.model("Trabajador").countDocuments({ email: value });
  return !emailCount;
}, "El correo ya tiene uso");

export type trabajadorModelType = mongoose.Document & Omit<Trabajador, "id">;

export default mongoose.model<trabajadorModelType>("Trabajador", trabajadorSchema);