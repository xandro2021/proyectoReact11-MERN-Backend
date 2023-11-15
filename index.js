import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';

const app = express();

dotenv.config();

conectarDB();

const PORT = process.env.PORT || 4000;

console.log('Desde index.js');
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})
