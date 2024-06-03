// Importing express module
const express = require('express');
const app = express();
let PORT = process.env.port || 3000

//Dynamo Setup
const { DynamoDBClient, ListTablesCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");



app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/',(req, res) => {
		res.sendFile(__dirname + '/index.html');
	});
app.listen(PORT,() => {console.log('Our express server is up on port 3000');});

app.post('/', async function(req, res) {
		const {name, accessKey, secretKey, title, review} = req.body;
		console.log(req.body);
		//putNewItemDB(name, accessKey, secretKey, title, review);
		res.send({name, accessKey, secretKey, title, review});
});

async function putNewItemDB(name, accessKey, secretKey, title, review){
	const client = new DynamoDBClient(
		{ region: "us-east-2",
		credentials:{
			accessKeyId: accessKey,//"AKIAZQ3DRCFGKNMRUFXN",
			secretAccessKey: secretKey,//"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"
		}
	});
	const input = {
		TableName: "Movies",
		Item: {
			"User": {
				"S": name
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

