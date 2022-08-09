
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://mongo:genius@clustername.mongodb.net/ibmDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

 // The database to use
const dbName = "ibmDB";
    
async function run() {
    try {
            await client.connect();
            console.log("Connected correctly to server");
            const db = client.db(dbName);

            // Use the collection "people"
            const col = db.collection("tweets");

            // Construct a query                                                                                                                                                            
            
            // Find one document
            const myDoc = await col.findOne();
            // Print to the console
            console.log(myDoc);

        } catch (err) {
            console.log(err.stack);
        }

    finally {
        await client.close();
}
}

run().catch(console.dir);
