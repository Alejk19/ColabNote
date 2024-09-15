import { Router } from "express";
import tareaModel from "../models/tareas.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const tareas = await tareaModel.find();
  res.json(tareas);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const tarea = await tareaModel.findOne({ _id: id });
  res.json(tarea);
});

router.post("/create", async (req, res) => {
  const tarea = req.body;
  console.log(tarea);
  const nuevaTarea = new tareaModel({
    titulo: tarea.titulo,
    estado: tarea.estado,
    encargado: tarea.encargado,
    descripcion: tarea.descripcion,
    fecha_fin: tarea.fecha_fin,
  });
  console.log(nuevaTarea);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

router.delete("/:id", (req, res) => {});

export default router;
