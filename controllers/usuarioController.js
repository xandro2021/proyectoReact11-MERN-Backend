import Usuario from '../models/Usuario.js';

const registrar = async (req, res) => {
  // Evitar registros duplicados, email unico
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error('El usuario ya esta registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Creo instancia usuario en la DB (Tabla)
    const usuario = new Usuario(req.body);
    // Almaceno el registro en la instancia (Tabla)
    const usuarioAlmacenado = await usuario.save();

    res.json(usuarioAlmacenado);
  }
  catch (error) {
    console.log(error);
  }
}

export {
  registrar
}
