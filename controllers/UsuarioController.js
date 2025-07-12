const Usuario=require('../models/Usuario');

exports.obtenerUsuarios= async(req, res)=>{
    const usuarios = await Usuario.findAll();
    res.json(usuarios);//[]
}



