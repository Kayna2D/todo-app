const { MongoClient } = require('mongodb');
const express = require('express');
var cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

let db;

const url = 'mongodb+srv://todoAppUser:todoAppUser@cluster0.hjyvnbz.mongodb.net/TodoApp?retryWrites=true&w=majority';
const dbName = 'TodoApp';
const client = new MongoClient(url);

(async () => {
  db = (await client.connect()).db(dbName);
  console.log("conected!!");
})();



/*let connectionString = 'mongodb+srv://todoAppUser:todoAppUser@cluster0.hjyvnbz.mongodb.net/TodoApp?retryWrites=true&w=majority' 

mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client) {
  db = client.db()
  app.listen(3000)
})*/



app.get('/', function(req, res) {
    res.send(
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #1</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #2</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #3</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        </ul>
        
      </div>
      
    </body>
    </html>`
    )
})

/*
app.post('/create-item', function (req, res) {
  db.collection('items').insertOne({text: req.body.item}, function() {
    console.log(req.body.item)
    res.send("Thanks for submitting the form.")
    
  })  
}) */

app.post("/create-item", async (req, res) => {
  try {
      const result = await db.collection("items").insertOne({ text: req.body.item })
      res.json(result)
  } catch (error) {
      res.status(500).json("Problem");
  }
});

app.listen(3000, () => {
  console.log("Server UP");
})

