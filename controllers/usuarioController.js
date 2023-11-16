import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
  // Evitar registros duplicados, email unico
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  // Si el usuario ya existe, termino la ejecucion
  if (existeUsuario) {
    const error = new Error('El usuario ya esta registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Creo instancia usuario en la DB (Tabla)
    const usuario = new Usuario(req.body);
    // Genero token para recuperar contraseña
    usuario.token = generarId();
    // Almaceno el registro en la instancia (Tabla)
    const usuarioAlmacenado = await usuario.save();

    res.status(200).json(usuarioAlmacenado);
  }
  catch (error) {
    console.log(error);
  }
}

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  // Comprobar si usuario existe
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  // Se evita que el sistema se llene de bots
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar el Password, usando la funcion propia creada en el modelo
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    })
  }
  else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  // El nombre es asignado igual a la palabra que tenia los : como :token
  const { token } = req.params;
  // Busco en la base de datos el usuario que tenga ese token que le habiamos asignado al crearlo. Este es el generado por Id
  const usuarioConfirmar = await Usuario.findOne({ token });

  // Si la base de datos no devuelve ningun valor es que no habia usuario que tuviera ese token
  if (!usuarioConfirmar) {
    const error = new Error('Token no valido');
    // Detenemos la ejecucion de la funcion y se envia un mensaje de error
    return res.status(403).json({ msg: error.message });
  }

  try {
    // Una vez confirmado se cambia las propiedades respectivas
    usuarioConfirmar.confirmado = true;
    // Se elimina el token porque es de un solo uso
    usuarioConfirmar.token = '';
    // Almacena el objeto modificado en la base de datos
    await usuarioConfirmar.save();

    // Envio la respuesta al cliente sobre la finalizacion correcta de la operacion
    res.status(200).json({ msg: 'Usuario Confirmado Correctamente' });
  }
  catch (error) {
    console.log(error);
  }

};

export {
  registrar,
  autenticar,
  confirmar,
}
