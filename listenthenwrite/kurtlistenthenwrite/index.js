const WebSocket = require('ws');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const MongoClient = require('mongodb').MongoClient;
const connect = async () => {
  client = await MongoClient.connect('mongodb://kurtcosmostaccount:vF5Grjyr3mronfhmaSx4GlseJb57hpeWOsEFeCqx6YqJLnbOM05Ep2EUHFiy8YyRO0h7b5BpLQkGACDbQ93OZw==@kurtcosmostaccount.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@kurtcosmostaccount@' ); 
  return client;
}

async function main() {
  const hub = "kurtpubsub.webpubsub.azure.com";
  var connectionString = "Endpoint=https://kurtpubsub.webpubsub.azure.com;AccessKey=p/iuO4B31PVliio9K6jmjLv30+M7u6MXBN5jxW0mf94=;Version=1.0;";
// we will all use the teacher's PubSub service
  let serviceClient = new WebPubSubServiceClient(connectionString, hub);
  let token = await serviceClient.getClientAccessToken();
  let ws = new WebSocket(token.url);
  ws.on('open', () => console.log('connected kurt'));
  ws.on('message', data => {
    let newRecord = JSON.parse(data);  // removes the bad " " from the property names
     // got the data, now write to mongo
     // have to wait for 2nd promise to get the client object
     connect().then( console.log("connected to mongo"))
     .then((client) => { writeDB(client, newRecord)});
     console.log(newRecord);
   });
}

main();

function writeDB(client, pNewRecord)
{
  try {
    const database = client.db("restdb");
    console.log("connected to DB successfully");
      // Insert a single document
      
      database.collection('restaurants').insertOne(pNewRecord)
      .then(console.log("mongo did not complain"));
      //client.close();
    } catch (err) {
      console.log(err.stack);
      client.close();     // Close connection if app is dying
    }
}

exports.index = main;