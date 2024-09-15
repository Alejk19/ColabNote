import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    creador: {
      type: String,
      required: true,
      default: "admin",
    },
    descripcion: {
      type: String,
      required: true,
    },
    tareas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tareas",
        default: []
      },
    ],
    miembros: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        default: []
      },
    ],
  },
  {
    timestamps: true,
  }
);

proyectoSchema.pre('findOne', function(next) {
  this.populate('tareas');
  this.populate('miembros');
  next();
});

proyectoSchema.pre('findOneAndUpdate', function(next) {
  this.populate('tareas');
  this.populate('miembros');
  next();
});

const proyectoModel = mongoose.model("proyectos", proyectoSchema);

export default proyectoModel;
