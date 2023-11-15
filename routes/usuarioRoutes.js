import express from 'express';
import { registrar } from '../controllers/usuarioController.js';

const router = express.Router();

// Autenticacion, Registro y Confirmacion de Usuarios
router.post('/', registrar);

export default router;
