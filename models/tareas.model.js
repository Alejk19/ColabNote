import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      required: true,
    },
    encargado:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
      },
    descripcion: {
      type: String,
      required: true,
    },
    fecha_fin: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tareaSchema.pre('findOne', function(next) {
  this.populate('encargado');
  next();
});

const tareaModel = mongoose.model("tareas", tareaSchema);

export default tareaModel;
