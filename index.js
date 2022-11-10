const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xng2az1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const allServices = client.db('travelCollection').collection('service');
        app.get('/', async (req, res) => {
            const query = {}
            const cursor = allServices.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = allServices.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
    }

    finally {

    }
}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('traveling server is running')
})

app.listen(port, () => {
    console.log(`traveling server running on ${port}`);
})
// i love money 