import express from 'express';

const app = express();

console.log('Desde index.js');
app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
})
