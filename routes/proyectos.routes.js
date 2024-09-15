import { Router } from "express";
import proyectoModel from "../models/projectos.model.js";

const router = Router();

//Trae todos los proyectos
router.get("/", async (req, res) => {
  const proyectos = await proyectoModel.find();
  res.json(proyectos);
});

//Trae un solo proyecto segun la id que pongas
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const proyecto = await proyectoModel.findOne({ _id: id });
  res.json(proyecto);
});

//Crea un proyecto
router.post("/create", async (req, res) => {
  const proyecto = req.body;
  const nuevoProyecto = new proyectoModel({
    titulo: proyecto.titulo,
    creador: proyecto.creador,
    descripcion: proyecto.descripcion,
    tareas: proyecto?.tareas,
    miembros: proyecto?.miembros,
  });
  await nuevoProyecto.save();
  console.log("Usuario creado:", nuevoProyecto);
  res.json(nuevoProyecto);
});

//Le asigna una tarea al proyecto con la id
router.put("/:id/tarea", async (req, res) => {
  const id = req.params.id;

  const id_tarea = req.body.id_tarea;

  const proyecto = await proyectoModel.findOne({ _id: id });

  proyecto.tareas.push(id_tarea);

  proyecto.save();

  res.json(proyecto);
});

//Le asigna un miembro al proyecto con la id
router.put("/:id/miembro", async (req, res) => {
  const id = req.params.id;

  const id_miembro = req.body.id_miembro;

  const proyecto = await proyectoModel.findOne({ _id: id });
  const buscarMiembro = proyecto.miembros.find(
    (element) => element._id.toString() === id_miembro
  );
  if (buscarMiembro) {
    return res.json({
      message: "Este miembro ya se encuentra en este proyecto.",
    });
  }

  proyecto.miembros.push(id_miembro);
  const proyectoActualizado = await proyectoModel.findOneAndUpdate(
    { _id: id },
    proyecto,
    { new: true }
  );

  res.json(proyectoActualizado);
});

//Le elimina una tarea al proyecto con la id
router.delete("/:id/tarea", async (req, res) => {
  const id = req.params.id;

  const id_tarea = req.body.id_tarea;

  const proyecto = await proyectoModel.findOne({ _id: id });
  const buscartarea = proyecto.tareas.find(
    (element) => element._id.toString() === id_tarea
  );

  if (buscartarea) {
    const resultado = proyecto.tareas.filter(
      (elemento) => elemento._id.toString() != id_tarea
    );
    const proyectoActualizado = await proyectoModel.findOneAndUpdate(
      { _id: id },
      { tareas: resultado },
      { new: true }
    );
    return res.json(proyectoActualizado);
  }

  res.json({ message: "Este tarea no se encuentra en este proyecto." });
});

//Le elimina un miembro al proyecto con la id
router.delete("/:id/miembro", async (req, res) => {
  const id = req.params.id;

  const id_miembro = req.body.id_miembro;

  const proyecto = await proyectoModel.findOne({ _id: id });
  const buscarMiembro = proyecto.miembros.find(
    (element) => element._id.toString() === id_miembro
  );

  if (buscarMiembro) {
    const resultado = proyecto.miembros.filter(
      (elemento) => elemento._id.toString() != id_miembro
    );
    const proyectoActualizado = await proyectoModel.findOneAndUpdate(
      { _id: id },
      { miembros: resultado },
      { new: true }
    );
    return res.json(proyectoActualizado);
  }

  res.json({ message: "Este miembro no se encuentra en este proyecto." });
});

export default router;
