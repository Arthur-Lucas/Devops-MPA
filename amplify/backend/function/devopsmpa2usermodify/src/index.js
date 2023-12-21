/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_USERS_ARN
	STORAGE_USERS_NAME
	STORAGE_USERS_STREAMARN
Amplify Params - DO NOT EDIT *//**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async function(event, context, callback) {
    const region = 'eu-west-3'

    const queryParams = event.queryStringParameters;
    const userId = queryParams.id;
  
    const userTableName = process.env.STORAGE_USERS_NAME;

    const requestBody = JSON.parse(event.body);
    const { firstname, lastname, email } = requestBody;

    const updateParams = {
        TableName: userTableName ,
        Key: {
            'id': userId
        },
        UpdateExpression: 'SET firstname = :firstname, lastname = :lastname, email = :email',
        ExpressionAttributeValues: {
            // ':imageURL': imageURL,
            ':firstname': firstname,
            ':lastname': lastname,
            ':email': email,
            // ':entreprise': entreprise
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        // Effectue la mise à jour dans la base de données
        const updatedUser = await dynamoDB.update(updateParams).promise();


        // Répond avec les données mises à jour
        const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(updatedUser.Attributes),
        };

        callback(null, response);
    } catch (error) {
        console.error('Erreur ', error);

        // Répond avec une erreur
        const response = {
            statusCode: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ error: 'Erreur ' }),
        };

        callback(null, response);
    }
};