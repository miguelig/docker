import express from 'express';
const router = express.Router();
import pool from '../database/db.js'; 
import Usuario from '../database/query.js'; 

const usuarioModel = new Usuario(pool);


router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioModel.getUsuarioById(id);
        if (usuario.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json(usuario[0]);
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/usuarios', async (req, res) => {
    const { Nombre, Usuario, Pass } = req.body;
    try {
        const result = await usuarioModel.addUsuario(Nombre, Usuario, Pass);
        res.status(201).send(`Usuario agregado con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/usuariosUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Usuario, Pass } = req.body;
    try {
        const result = await usuarioModel.updateUsuario(id, Nombre, Usuario, Pass);
        if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.send(`Usuario con ID ${id} actualizado`);
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/usuariosDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await usuarioModel.deleteUsuario(id);
        if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.send(`Usuario con ID ${id} eliminado`);
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;
