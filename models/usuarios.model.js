import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notificaciones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notificaciones",
      },
    ],
    proyectos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proyectos",
      },
    ],
    tarea: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tareas",
      },
    ],
  },
  {
    timestamps: true,
  }
);
usuarioSchema.pre("findOne", function (next) {
  this.populate("tarea");
  this.populate("proyectos");
  this.populate("notificaciones");
  next();
});

const usuarioModel = mongoose.model("usuarios", usuarioSchema);

export default usuarioModel;
