import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
// Habilito la lectura de json para poder ver el body de los request de tipo post
app.use(express.json());

dotenv.config();

conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})
