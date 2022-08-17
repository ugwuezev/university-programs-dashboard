
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongo:genius@cluster0.4poj9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("ibmDB").collection("universities");
  // perform actions on the collection object
  collection.find();

  client.close();
});