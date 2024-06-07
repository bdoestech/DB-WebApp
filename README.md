
# EffedUpMovieClub-WebApp

This is a basic web application that is based on NodeJS and Express. This app uses a html form, which takes some info from the user. This info is stored to a DynomoDB database.

This app also has APIs to retrieve data from the DynamoDB database.

Web App hosted here: http://horror-forms.bdoestech.com/
## API Reference

#### Get 'brendan' dataset

```http
  GET http://horror-forms.bdoestech.com/movies-brendan
```
This API returns data in JSON format.

#### Get 'darayus' dataset

```http
  GET http://horror-forms.bdoestech.com/movies-darayus
```
This API returns data in JSON format.

## Package Requirements

#### Run the following commands to install necessary packages:
npm install express --save

npm install dotenv --save

npm install @aws-sdk/client-dynamodb --save

npm install body-parser --save

npm install cors --save
