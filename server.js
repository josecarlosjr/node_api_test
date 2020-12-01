import express from 'express';
import bodyParser from 'body-parser';

//npx nodemon --exec npx babel-node <nome do arq> 

//fake db
const articleInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],        
    },
    'learn-node' : {
        upvotes: 0,
        comments: [],
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: [],
    },
}




//const express = require('express')
const app = express();

app.use(bodyParser.json());

var Array = []

app.post('/api/articles/:nome/upvotes', (req, res) => {
    const articleName = req.params.nome;
    articleInfo[articleName].upvotes = articleInfo[articleName].upvotes + 1
    
    res.status(200).send(`Existe o artigo ${articleName} e agora tem ${articleInfo[articleName].upvotes}`)
});

app.post( "/api/:artigo", (req, res) =>  {
    const artigo = req.params.artigo
    res.send(`O nome do artigo é ${artigo}`)
});

app.get("/", (req, res) => { 
     res.send('Hello Node.js')
     }
 );

 app.get("/second", (req, res) => { 
     res.send('Hello')
     }
 );

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


app.listen(3333, () => console.log('Listening on port 3333'));
