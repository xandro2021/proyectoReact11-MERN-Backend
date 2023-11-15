import Usuario from '../models/Usuario.js';

const registrar = async (req, res) => {

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
