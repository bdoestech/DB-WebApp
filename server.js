//Install express and create app
const express = require('express');
const app = express();
const interval = 800000; // Interval in milliseconds (30 seconds)

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

setInterval(reloadWebsite, interval);

//App setup
app.use(express.json());
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//listen and get index.html for form creation
const port = process.env.PORT || 3000;
app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');});
app.listen(port,() => {console.log('Our express server is up on port 3000\n');});



//GET APIs /////////////////
app.get("/movies-brendan", async function(req, res) {
	try {
		await client.connect();
		const database = client.db("Cluster0");
		const data = await database.collection("Brendan").find().toArray(); 
		console.log("Data sent from '/movies-brendan' API\n");
		res.json(data);
	}
	catch (err) {
		console.log("Error fetching data in '/movies-brendan' API");
		console.log(`${err}\n`);
		res.send(`${err}`);
	}

});

app.get("/movies-darayus", async function(req, res) {
	try {
		await client.connect();
		const database = client.db("Cluster0");
		const data = await database.collection("Darayus").find().toArray(); 
		console.log("Data sent from '/movies-darayus' API\n");
		res.json(data);
	}
	catch (err) {
		console.log("Error fetching data in '/movies-darayus' API");
		console.log(`${err}\n`);
		res.send(`${err}`);
	}
});

app.get("/ping", async function(req, res) {
	// delay(3000).then(() => console.log('ran after 3 seconds passed'));
	res.send("Self Ping Successful");
});


// SELF PING /////////////////
function reloadWebsite() {
	// fetch('http://localhost:3000/ping')

    fetch('https://effedupforms.bdoestech.com/ping')
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}\n`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}


// FORMS ///////////////////
app.post('/form-submitted', async function(req, res) {
    let data = req.body;
	if (data.pass == "1234darhasafatty"){
		console.log("Correct Password")
		putNewItemDB(data.name, data.movie, data.year, data.review, data.rating, data.date);
		res.send('<h1>Form submitted</h1><style>body{background-color: rgb(10, 10, 10); color: white;}</style>');
	}
	else {
		console.log("Wrong Password")
		res.send('<h1>EHHHHHH wrong password buddy, go back and try again.</h1><style>body{background-color: rgb(10, 10, 10); color: white;}</style>');
	}
    // console.log(data.name);

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

