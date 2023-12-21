/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */const AWS = require('aws-sdk');

 exports.handler = async (event, context) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTableName = process.env.STORAGE_USERS_NAME
    const params = {
      TableName: userTableName,
      Item: {
        id: event.userName,
        email: event.request.userAttributes.email,
        firstname: event.request.userAttributes.name,
        lastname: event.request.userAttributes.family_name
      },
    };
    await dynamoDB.put(params).promise();
    return event;
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans DynamoDB', error);
    throw error;
  }
};