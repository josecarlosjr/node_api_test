/*o node.js tem dificuldades para entender ES6 
por exemplo o uso do import express from 'express'
para utilizar o import é necessario instalar alguns pacotes
npm install --save-dev @babel/core @babel/node @babel/preset-env
e para executar utilize o comando 
npx babel-node server.js
*/

const express = require('express');
var router = express.Router();
// var cors = require("cors");

//explicacao no repositorio nodejs
//executar utilizando o comando node <nome_do_app>

//const express = require('express');

const app = express();
// app.use(cors());

//app.use(express.json()); // para que o request.body consiga interpretar o JSON

app.get ("/", function(req, res, next){
    res.send("Home Page");
});

app.get("/Noticias", function(req, res, next) {
    res.send("Noticias aqui");

});

module.exports = router;


/* app.post("/ola", (req, res) => {
     res.send(`Ola  ${req.body.name}` )
     }    
 );
 app.get("/ola/:name", (req, res) => { 
     res.send(`Ola ${req.params.name}`)
     }
 )
app.post("/", (req, res) => {
        res.send("Home page")
    }
);
*/


app.listen(80, () => console.log('Listening on port 3333'));
