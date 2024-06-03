const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { DynamoDBClient, ListTablesCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');});

app.post('/Form-Submitted', async function(req, res) {
    let data = req.body;
    // console.log(data.name);
    putNewItemDB(data.name,data.id,data.key,data.movie);
    res.send(`<h1>Form submitted successfully! Thanks ${data.name}</h1> <h2>${data.movie}</h2> <h2>${data.id}</h2> <h2>${data.key}</h2>`);
});

const port = process.env.PORT || 3000;
app.listen(port,() => {console.log('Our express server is up on port 8080');});



async function putNewItemDB(name, accessKey, secretKey, title){
	const client = new DynamoDBClient(
		{ region: "us-east-2",
		credentials:{
			accessKeyId: accessKey,
			secretAccessKey: secretKey,
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
				}
		}
	};
	const command = new PutItemCommand(input);
	await client.send(command);

}
