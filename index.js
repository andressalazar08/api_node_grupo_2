const express=require('express');//importamos la libreria


const app=express()//instanciando una aplicación tipo express

//esto permite leer un JSON que llegue por body
app.use(express.json())
//req: request 
//res: response

/*
@app.route("/", method=["GET", "POST"])
def home():
    return "hola!"
*/

//ruta
app.get("/",(req, res)=>{
    res.send("backend con express")
});

const port=3000;

//ruta usuarios
//esto quedará en BBDD

//[20,35,80,6]
// 0  1  2  3
let usuarios=[
    {id:1, nombre:"andres", email: "andres@email.com"},
    {id:2, nombre:"felipe", email: "felipe@email.com"},
    {id:3, nombre:"diana", email: "diana@email.com"},
]
//READ
//ruta para obtener el listado de usuarios
app.get("/usuarios/todos",(req,res)=>{
    res.json(usuarios)
});
//READ
//obtener usuarios por id
app.get("/usuarios/buscar/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    //console.log(typeof(id))
    const usuario=usuarios.find(user=>user.id===id)
    //console.log(usuario)
    if(!usuario){
        res.status(404).json({
            mensaje:"Usuario no encontrado"
        })
    }
    res.json(usuario)
})


//Crear un nuevo usuario CREATE
app.post("/usuarios/crear", (req, res)=>{
    //console.log(req.body)
    const {nombre, email}=req.body;//define la variable
    //console.log(nombre,email)
    const nuevoUsuario={
        id:usuarios.length+1,
        nombre:nombre,
        email:email,
    }
    //guardar el objeto creado en la BBDD
    usuarios.push(nuevoUsuario)
    res.status(201).json({
        mensaje:"usuario creado correctamente",
        usuarioCreado:nuevoUsuario
    })
})

//Actualizar un usuario UPDATE
app.put("/usuarios/actualizar/:id",(req,res)=>{
    const {nombre,email}=req.body;
    const id=parseInt(req.params.id);
    //buscar
    const usuario=usuarios.find(u=>u.id===id);
    if(!usuario){
        res.status(404).json({
            mensaje:"Usuario a modificar no encontrado"
        })
    }
    const infoAnterior=usuario.nombre;//guardo los datos encontrados
    usuario.nombre=nombre;//modifica el campo nombre
    
    res.status(202).json({
        mensaje:"Usuario modificado correctamente",
        infoAnterior:infoAnterior,
        infoNueva:usuario
    })

})


//DELETE
app.delete("/usuarios/eliminar/:id",(req,res)=>{
//capturar el id pasado por parametros
const id=parseInt(req.params.id);
//encontrar el índice correspondiente al id entregado
const index=usuarios.findIndex(user=>user.id===id)
//eliminar de la lista la info del indice encontrado
//console.log(index)
if(index===-1){
    res.status(404).json({
        mensaje:`usuario con id ${id} no encontrado`
    })
    return;
}

    usuarios.splice(index)
    res.status(200).json({
    mensaje:`Usuario con id ${id} eliminado correctamente`
})


})








app.listen(port,()=>{
    console.log(`servidor ejecutando en el puerto ${port}`)
})