const express = require('express');
const cors = require('cors');
// Must includes to get requirement variable.
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
// Cors policy to access from any port
app.use(cors());
// String converter middleware
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.9zcs4sa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async()=> {
    try{
        // !Creating Data base inside server
        const database = client.db('EmaJohnDB').collection('products');



        // ! Getting data from database
        app.get('/products',async(req,res)=> {

            // Taking query  request
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            console.log(page,size)
            // query all data give me
            const query = {};

            // Finding all data from the database
            const cursor = await database.find(query);

            // Converting data into array to use it.
            const products = await cursor.skip(page*size).limit(size).toArray();


            // Counting total products 
            const count = await database.estimatedDocumentCount();


            // Returning data to requester.
            res.send({count,products});

 
        })


    }

    finally
    {
        console.log("Finally we are DONE!")
    }
}


run().catch(error=> console.log(error))







app.get('/', (req,res)=> {
    res.send("i'm working");
})



app.listen(port, ()=> {
    console.log('ema john running port ' + port);
})