
module.exports = async function (context, req) {
    const { WebPubSubServiceClient } = require('@azure/web-pubsub');
    const newPost = (req.body);
 
let result = "";
    try {
               
      //console.log(newPost);
        //let message = JSON.stringify(newPost) // stringify to SB messes up the object
        let message = newPost;
        
          const hub = "kurtpubsub.webpubsub.azure.com";
          var connectionString = "Endpoint=https://kurtpubsub.webpubsub.azure.com;AccessKey=p/iuO4B31PVliio9K6jmjLv30+M7u6MXBN5jxW0mf94=;Version=1.0;";
          let serviceClient = new WebPubSubServiceClient(connectionString, hub);
          //console.log(message);
        // by default it uses `application/json`, specify contentType as `text/plain` if you want plain-text
        serviceClient.sendToAll(message, { contentType: "application/json" })
        .then(console.log(message));
//=====================================================================================
      
      } catch (err) {
        console.log(err.stack);
         // Close connection
        //client.close();
      }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}
