import { get } from 'aws-amplify/api';

async function getUser() {
  try {
    const restOperation = get({ 
      apiName: 'apimodifyuser',
      path: '/updateUser' 
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response);
  } catch (error) {
    console.log('GET call failed: ', error);
  }
}