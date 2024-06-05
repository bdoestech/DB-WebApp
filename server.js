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

//DynamoDB setup
const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient(
	{ region: "us-east-2",
	credentials:{
		accessKeyId: process.env.AWS_ID,
		secretAccessKey: process.env.AWS_KEY,
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
app.get("/movies-brendan", async function(req, res, next) {
    var params = {
        TableName: "Brendan"
      };
	const command = new ScanCommand(params);
    const data = await client.send(command);
	res.send(data.Items);
   });
   app.get("/movies-darayus", async function(req, res, next) {
    var params = {
        TableName: "Darayus"
      };
	const command = new ScanCommand(params);
    const data = await client.send(command);
	res.send(data.Items);
   });
//GET APIs /////////////////



// FORMS ///////////////////
app.post('/form-submitted', async function(req, res) {
    let data = req.body;
    // console.log(data.name);
    putNewItemDB(data.name, data.id, data.key, data.movie, data.review, data.rating);
	res.send('<h1>Form submitted</h1><style>body{background-color: rgb(10, 10, 10); color: white;}</style>');
});
async function putNewItemDB(name, accessKey, secretKey, title, review, rating){
	const client = new DynamoDBClient(
		{ region: "us-east-2",
		credentials:{
			accessKeyId: accessKey,
			secretAccessKey: secretKey,
		}
	});
	const input = {
		TableName: name,
		Item: {
			"Title": {
				"S": title
				},
            "Review": {
                "S": review
                },
			"Rating": {
				"N": rating
				}
		}
	};
	const command = new PutItemCommand(input);
	// client.send(command);
	await client.send(command);

}
// FORMS ///////////////////

