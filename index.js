const express=require('express');//importamos la libreria


const app=express()//instanciando una aplicación tipo express

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
let usuarios=[
    {id:1, nombre:"andres", email: "andres@email.com"},
    {id:2, nombre:"felipe", email: "felipe@email.com"},
    {id:3, nombre:"diana", email: "diana@email.com"},
]

//ruta para obtener el listado de usuarios
app.get("/usuarios",(req,res)=>{
    res.json(usuarios)
});

//obtener usuarios por id
app.get("/usuarios/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    //console.log(typeof(id))
    const usuario=usuarios.find(user=>user.id===id)
    res.json(usuario)
})












app.listen(port,()=>{
    console.log(`servidor ejecutando en el puerto ${port}`)
})