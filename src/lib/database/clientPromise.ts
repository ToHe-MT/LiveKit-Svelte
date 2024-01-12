import { MONGODB_CONNECTION_STRING } from '$env/static/private';
import { MongoClient } from 'mongodb';

if (!MONGODB_CONNECTION_STRING) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_CONNECTION_STRING"');
}

const uri = MONGODB_CONNECTION_STRING;

let client;
let clientPromise:any;


client = new MongoClient(uri);
clientPromise = client.connect();

// 
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;