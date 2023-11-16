import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

// hashear password antes de guardar el registro
usuarioSchema.pre('save', async function(next) {
  // Si se esta modificando algo que no sea el pass, pues evito que lo vuelva a hashear
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  // this va a ser referencia al usuario que se esta enviando a guardar(save)
  this.password = await bcrypt.hash(this.password, salt);
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
