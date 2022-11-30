const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

// D8CpLU02uz5Cfxvy
// lusStay

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2an645.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// collection 

const RoomsCollection = client.db("test").collection("Rooms");
const userCollection = client.db("test").collection("user");
const reviewCollection = client.db("test").collection("review");
const galleryCollection = client.db("test").collection("gallery");
const foodsCollection = client.db("test").collection("foods");

async function run(){

    try{
        app.get('/', (req, res)=>{
            res.send('connected data to your server')
        })
        // add rooms 
        app.post('/rooms', async (req, res)=>{
            const room = req.body;
            const result = await RoomsCollection.insertOne(room);
            res.send(result);
        })
        // add Foods 
        app.post('/foods', async (req, res)=>{
            const room = req.body;
            const result = await foodsCollection.insertOne(room);
            res.send(result);
        })
        
        // (License To Grill) get foods 
        app.get('/foods/:foods_type', async (req, res)=>{
            console.log(req.params.foods_type)
            const query = {foodsType: req.params.foods_type };
            const cursor = foodsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result);
        })
        // get rooms 
        app.get('/rooms', async (req, res)=>{
            const query = {};
            const cursor = RoomsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result);
        })
        // details 
        app.get('/book/:_id', async (req, res)=>{
            const {_id }=  req.params
            const query = {_id: ObjectId(_id)};
            const cursor = RoomsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result);
            
        })

        // post user 
        app.post('/user', async (req, res)=>{
            const user = req.body;
            const result =  await userCollection.insertOne(user)
            res.send(result);
        })
        // post review 
        app.post('/review', async (req, res)=>{
            const review = req.body;
            const result =  await reviewCollection.insertOne(review)
            res.send(result);
        })
        // post gallery 
        app.post('/gallery', async (req, res)=>{
            const gallery = req.body;
            const result =  await galleryCollection.insertOne(gallery)
            res.send(result);
        })
        // get review 
        app.get('/review', async (req, res)=>{
            const query = {};
            const cursor = reviewCollection.find(query)
            const result = await cursor.toArray()
            res.send(result);
        })
        // get gallery 
        app.get('/gallery', async (req, res)=>{
            const query = {};
            const cursor = galleryCollection.find(query)
            const result = await cursor.limit(8).toArray()
            res.send(result);
        })


    }finally{

    }
}

run().catch(console.dir)






app.listen(port, () => {
    console.log('Running your server')
})