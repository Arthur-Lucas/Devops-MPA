/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */const AWS = require('aws-sdk');

 exports.handler = async (event, context) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTableName = process.env.STORAGE_USERS_NAME
    console.log('userTableName', userTableName)
    console.log('event', event.userName)

    const params = {
      TableName: userTableName,
      Item: {
        id: event.userName,
      },
    };
    await dynamoDB.put(params).promise();

    console.log('succés');
    return event;
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans DynamoDB', error);
    throw error;
  }
};