const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { DynamoDBClient, ListTablesCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

let test = 0;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');});

app.post('/', async function(req, res) {
    let data = req.body;
    // console.log(data.name);
	console.log(test);
    putNewItemDB(data.name, data.id, data.key, data.movie, data.review);
	console.log(test);
	if (test==1)
    	res.send(`<h1>Form submitted successfully!</h1>`);
	if (test==2)
    	res.send(`<h1>Error!</h1>`);
});


const port = process.env.PORT || 3000;
app.listen(port,() => {console.log('Our express server is up on port 3000');});




async function putNewItemDB(name, accessKey, secretKey, title, review){
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
				},
            "Review": {
                "S": review
                }
		}
	};
	const command = new PutItemCommand(input);
	// client.send(command);
	await client.send(command);

}

