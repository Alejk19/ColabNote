import { Router } from "express";
import usuarioModel from "../models/usuarios.model.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";

const router = Router();

//Trae todos los usuarios
router.get("/", async (req, res) => {
  const usuarios = await usuarioModel.find();
  res.json(usuarios);
});

//Trae el usuario segun la id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const usuario = await usuarioModel.findOne({ _id: id });
  res.json(usuario);
});

//Crea y registra un usuario
router.post("/register", async (req, res) => {
  const { nombre, apellido, edad, email, password } = req.body;

  try {
    const usuarioExistente = await usuarioModel.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "La contraseña debe tener al menos 8 caracteres" });
    }

    console.log(password);
    const nuevoUsuario = new usuarioModel({
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      email: email,
      password: createHash(password),
    });
    await nuevoUsuario.save();
    console.log(nuevoUsuario);
    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

//Permite el logeo de un usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await usuarioModel.findOne({ email });

  if (!usuario) {
    return res.status(400).json({ msg: "Credenciales incorrectas" });
  }

  if (!isValidPassword(usuario, password)) {
    return res.status(400).json({ msg: "Credenciales incorrectas" });
  }

  const token = generateToken(usuario);
  usuario.token = token;
  res.json({token});
});

//Le manda una notificacion a un usuario
router.put("/notificacion/:id", async (req, res) => {
  const id = req.params.id;

  const id_notificacion = req.body.id_notificacion;

  const usuario = await usuarioModel.findOne({ _id: id });

  usuario.notificaciones.push(id_notificacion);

  usuario.save();

  res.json(usuario);
});

//Le asigna un proyecoto a un usuario
router.put("/proyecto/:id", async (req, res) => {
  const id = req.params.id;

  const id_proyecto = req.body.id_proyecto;

  const usuario = await usuarioModel.findOne({ _id: id });

  usuario.proyectos.push(id_proyecto);

  usuario.save();

  res.json(usuario);
});

//Le asigna una tarea a un usuario
router.put("/tarea/:id", async (req, res) => {
  const id = req.params.id;

  const id_tarea = req.body.id_tarea;

  const usuario = await usuarioModel.findOne({ _id: id });

  usuario.tarea.push(id_tarea);

  usuario.save();

  res.json(usuario);
});

//Le elimina una tarea al usuario (No funca)
router.delete("/:id/tarea", async (req, res) => {
  const id = req.params.id;

  const id_tarea = req.body.id_tarea;

  const usuario = await usuarioModel.findOne({ _id: id });
  const buscarTarea = usuario.tarea.find(
    (element) => element._id.toString() === id_tarea
  );

  if (buscarTarea) {
    const resultado = usuario.tarea.filter(
      (elemento) => elemento._id.toString() != id_tarea
    );
    const usuarioActualizado = await usuarioModel.findOneAndUpdate(
      { _id: id },
      { tareas: resultado },
      { new: true }
    );
    return res.json(usuarioActualizado);
  }

  res.json({ message: "Este tarea no se encuentra en este usuario." });
});

export default router;