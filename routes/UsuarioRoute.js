const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')


router.get("/usuarios/todos",UsuarioController.obtenerUsuarios);



module.exports = router;