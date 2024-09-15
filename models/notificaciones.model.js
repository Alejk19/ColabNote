import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema(
  {
    mensaje: {
      type: String,
      required: true,
    },
    usuario: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const notificacionModel = mongoose.model("notificaciones", notificacionSchema);

export default notificacionModel;
