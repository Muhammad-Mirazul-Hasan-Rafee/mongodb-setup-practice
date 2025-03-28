   const express= require('express');
   const cors = require('cors');
   const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
   const port = process.env.PORT || 5000;
   const app =express();

//    rafeehasan88 , SCC8M8k9IBKu9LV2
// middleware

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://rafeehasan88:SCC8M8k9IBKu9LV2@cluster0.vhv77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    app.get('/users' , async(req , res) =>{
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });





    app.post('/users' , async(req , res)=>{
      const user = req.body;
      console.log('New User:' , user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });



    app.delete('/users/:id' , async(req , res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {_id:new ObjectId(id)}
      const result = await usersCollection.deleteOne(query);
      res.send(result);


    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

    // we need to connect db symultanously 
    // await client.close();
  }
}
run().catch(console.dir);
















   app.use(cors());
   app.use(express.json());

   app.get('/' , (req , res) =>{
    res.send('SIMPLE CRUD IS RUNNING HERE!!')
   })


   app.listen(port , () =>{
    console.log(`Simple Crud is running on port: ${port}`);
   })