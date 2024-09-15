import { Router } from "express";
import notificacionModel from "../models/notificaciones.model.js";
import usuarioModel from "../models/usuarios.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const notificaciones = await notificacionModel.find();
  res.json(notificaciones);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const notificacion = await notificacionModel.findOne({ _id: id });
  res.json(notificacion);
});

router.post("/create", async (req, res) => {
  const notificaciones = req.body;
  const nuevonotificacion = new notificacionModel({
    mensaje: notificaciones.mensaje,
    usuario: notificaciones.usuario,
  });
  await nuevonotificacion.save();
  res.json(nuevonotificacion);
});

router.post("/send", async (req, res) => {
  const id_usuario = req.body.usuario;
  const usuario = await usuarioModel.findOne({ _id: id_usuario });
  usuario.save();
  res.json(usuario);
});

router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

export default router;
