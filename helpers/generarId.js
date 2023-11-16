// Es un token que se envia al usuario al email para poder recuperar la contraseña
const generarId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

export default generarId;
