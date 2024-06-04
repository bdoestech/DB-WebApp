const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient(
	{ region: "us-east-2",
	credentials:{
		accessKeyId: process.env.AWS_ID,
		secretAccessKey: process.env.AWS_KEY,
	}
});


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');});
app.listen(port,() => {console.log('Our express server is up on port 3000');});



app.get("/movies", async function(req, res, next) {
    var params = {
        TableName: "Movies"
      };
	const command = new ScanCommand(params);
    const data = await client.send(command);
	res.send(data.Items);
   });















// FORMS ///////////////////
app.post('/form-submitted', async function(req, res) {
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
// FORMS ///////////////////

