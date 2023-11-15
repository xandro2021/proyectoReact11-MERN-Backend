import mongoose from 'mongoose';

// timestamps: true es para crear dos columnas, una de creado y otra de actualizado
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    token: {
      type: String
    },

    confirmado: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
