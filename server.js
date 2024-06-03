// Importing express module
const express = require('express');
const axios = require("axios");
const app = express();
let PORT = process.env.port || 3000

//Dynamo Setup
const { DynamoDBClient, ListTablesCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient(
	{ region: "us-east-2",
	credentials:{
		accessKeyId: "AKIAZQ3DRCFGKNMRUFXN",
		secretAccessKey: "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"
	}
});


app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/',(req, res) => {
		res.sendFile(__dirname + '/index.html');
	});
app.listen(PORT,
	() => {
		console.log(
			'Our express server is up on port 3000'
		);
});

app.post('/', async function(req, res) {
		const {username, title, review} = req.body;
		console.log(req.body);
		putNewItemDB(username, title, review);
		res.send({username});
});

async function putNewItemDB(user, title, review){
	const input = {
		TableName: "Movies",
		Item: {
			"User": {
				"S": user
				},
			"Title": {
				"S": title
				},
			"Review": {
			"S": review
			}
		}
	};
	const command = new PutItemCommand(input);
	await client.send(command);

}

