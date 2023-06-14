
module.exports = async function (context, req) {
    const MongoClient = require('mongodb').MongoClient;
    const connect = async () => {
        const client = MongoClient.connect('mongodb://kurtcosmostaccount:vF5Grjyr3mronfhmaSx4GlseJb57hpeWOsEFeCqx6YqJLnbOM05Ep2EUHFiy8YyRO0h7b5BpLQkGACDbQ93OZw==@kurtcosmostaccount.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@kurtcosmostaccount@' );  // put in your conn string
        return client;
    }
    const newPost = (req.body);
    console.log((newPost))
 
let result = "";
    try {
        const client = await connect();
        const database = client.db("restdb");
        context.log("connected to DB successfully");
    
         // Insert a single document
         result = await database.collection('restaurants').insertOne(newPost);
         // Close connection
        client.close();
    
      
      } catch (err) {
        console.log(err.stack);
         // Close connection
        client.close();
      }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}
