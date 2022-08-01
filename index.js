const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4200;
const hbs = require("hbs"); 
const mysql = require("mysql2");
const path = require("path");
const nodemailer = require("nodemailer");

// conecto app a la base de datos 

/* const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDTB,
    database: process.env.DATABASE
}); 

//conecto la base de datos
const conectar = (
    conexion.connect((error)=>{
        if(error) throw error;
        console.log("Conecte la base de datos")
    })
);*/

//Configuracion de middelwares
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({extended: false}));

//Configuramos la vista de la app
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, 'views/partials'));         

////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res)=>{
    res.render("index.hbs", {titulo: "Nuestra institucion"})
});

//                                 HISTORIA
app.get("/historia", (req, res)=>{
    res.render("historia", {titulo: "Historia de nuestra institucion"})
}); 


//                                 CONTACTOS
app.get("/sobrenosotros", (req, res)=>{
    res.render("sobrenosotros", {titulo: "Contactanos"})
}); 

//                                 INSCRIPCION
app.get("/inscripcion", (req, res)=>{
    res.render("inscripcion.hbs", {titulo: "Inscribite en nuestra institucion"})
});

app.post("/inscripcion", (req, res)=>{
    const{nombre, edad, apellido, email} = req.body;

    if(nombre== "" || edad== "" || apellido=="" || email==""){
        let validacion= "faltan datos para inscribirte"
        res.render("inscripcion", {
            titulo: "Inscribite en nuestra institucion",
            validacion
        })
    }else{
        console.log(nombre);
        console.log(edad);
        console.log(apellido);
        console.log(email);

        let data = {
            nombre: nombre,
            edad: edad,
            apellido: apellido,
            email: email
        }
        let sql = "INSERT INTO INSCRIPCION SET ?"
            let query = conexion.query(sql, data, (err, results)=>{
                if(err) throw err;
                res.render("inscripcion", {titulo: "Inscribite en nuestra institucion"},)
            })
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////////
//escucha del puerto
app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`);
})

app.on("error", (error) =>{
    console.log(`Tenemos un error ${error}`);
});


