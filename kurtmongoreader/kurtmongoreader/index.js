
module.exports = async function (context, req) {
   
    const MongoClient = require("mongodb").MongoClient;
    const connect = async () => {
            const client = MongoClient.connect('mongodb://kurtcosmostaccount:vF5Grjyr3mronfhmaSx4GlseJb57hpeWOsEFeCqx6YqJLnbOM05Ep2EUHFiy8YyRO0h7b5BpLQkGACDbQ93OZw==@kurtcosmostaccount.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@kurtcosmostaccount@' );
            return client;
        }
         let cityname = (req.query.name || (req.body && req.body.name));

        try {
            const client = await connect();
            const database = client.db("restdb");
            context.log("connected to DB successfully");
            let returndata;
            if(cityname == "all"){
                returndata = await database.collection("restaurants").find().toArray(); 
                client.close();     // Close connection
            }
            else{
                returndata = await database.collection("restaurants").find({city: cityname}).toArray();  
                client.close();     // Close connection
            }
           
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: returndata
            };
        } catch (error) {
            context.res.status(500).send(error);
    
            }
    };  
    