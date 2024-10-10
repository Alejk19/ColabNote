//Import de paquetes (externos)
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

//Import dentro de la app
import rutasProyectos from "./routes/proyectos.routes.js";
import rutasTareas from "./routes/tareas.routes.js";
import rutasUsuarios from "./routes/usuarios.routes.js";
import rutasNotificaciones from "./routes/notificaciones.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.listen(PORT, () => console.log("Server up!")); //Iniciar servidor
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/proyectos", rutasProyectos);
app.use("/api/tareas", rutasTareas);
app.use("/api/usuarios", rutasUsuarios);
app.use("/api/notificaciones", rutasNotificaciones);

const URL = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(URL);
    console.log("Conectado a la DB de Mongo!");
  } catch (error) {
    console.error("Error conectando con la base de datos:", error);
  }
}

connectDB();
