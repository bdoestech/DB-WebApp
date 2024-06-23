//Install express and create app
const express = require('express');
const app = express();

//CORS was necessary for fetch command from frontend JS
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//dotenv is used for environment variables
require('dotenv').config();
const bodyParser = require('body-parser');

//MongoDB Setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://brendan:2U3i6D9lcLbkcW70@cluster0.f2doiw8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
	serverApi: {
	  version: ServerApiVersion.v1,
	  strict: true,
	  deprecationErrors: true,
	}
  });


//App setup
app.use(express.json());
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//listen and get index.html for form creation
const port = process.env.PORT || 3000;
app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');});
app.listen(port,() => {console.log('Our express server is up on port 3000');});



//GET APIs /////////////////
app.get("/movies-brendan", async function(req, res) {
	delay(3000).then(() => console.log('ran after 3 seconds passed'));
	await client.connect();
	const database = client.db("Cluster0");
	const data = await database.collection("Brendan").find().toArray(); 
	// console.log(data);
	res.json(data);
});

app.get("/movies-darayus", async function(req, res) {
	delay(3000).then(() => console.log('ran after 3 seconds passed'));
	await client.connect();
	const database = client.db("Cluster0");
	const data = await database.collection("Darayus").find().toArray(); 
	// console.log(data);
	res.json(data);
});
//GET APIs /////////////////
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
  }
  


// FORMS ///////////////////
app.post('/form-submitted', async function(req, res) {
    let data = req.body;
    // console.log(data.name);
    putNewItemDB(data.name, data.movie, data.year, data.review, data.rating, data.date);
	res.send('<h1>Form submitted</h1><style>body{background-color: rgb(10, 10, 10); color: white;}</style>');
});
async function putNewItemDB(name, title, year, review, rating, date){
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		const database = client.db("Cluster0");
		const movies = database.collection(name);

		const doc = {
				Title: title, Year: year, Review: review, Rating: rating, Date: date
		};
		// create a document to be inserted
		// const doc = { name: "Red", town: "kanto" };
		const result = await movies.insertOne(doc);
		console.log(
		  `${title} was inserted with the _id: ${result.insertedId}`,
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
// FORMS ///////////////////

