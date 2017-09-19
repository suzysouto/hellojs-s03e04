const knex = require("./db").knex
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

app.use(express.static("public"))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// https://stackoverflow.com/a/12008719/420096


app.get("/pessoa/list", (req, res) => {
  knex("pessoa").select().then(ret => {
    res.send(ret)
  }).catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

app.post("/dosave", (req, res) => {
  res.send(`
    <h2>Olá, ${req.body.nome}!</h2>
    <a href="index.html">voltar</a>
  `)
})

knex.migrate.latest().then(_=>{
  console.log("knex migrate latest - [DONE]")
  app.listen(3000, _ => console.log('All subsystems - [ONLINE]'))
})