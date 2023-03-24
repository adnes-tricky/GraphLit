const mongoose = require("mongoose");
const neo4j=require('neo4j-driver')
var driver, db;
let sessionCount=0;
var Mongoose = require('mongoose/lib').Mongoose;
async function mongoConfig(){ 
    mongoose.set("strictQuery", true);
    await mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // number of socket connection to keep open
        maxPoolSize: 1000
    })
    .then(() => console.log('MongoDB database Connected ....'))
    .catch((err) => console.log(err))
    // db=new Mongoose().createConnection(process.env.MONGO_URI,
    //     {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     })
    //     console.log('MongoDB database Connected ....')
}

async function mongoDisconnect(){
   // db.close().then(() => console.log('Connection closed'));
    delete mongoose.connection.models['Image'];
    delete mongoose.connection.collections['Image'];
    //delete mongoose.connection.base.modelSchemas['Image'];
}

async function neoDriverOpen(){
    console.log("Neo driver open")
    driver=neo4j.driver(
        "neo4j+s://2d69efaf.databases.neo4j.io",
        neo4j.auth.basic("neo4j","LuxOA1vEqYcFTUspxh4ipsZvQDvQ0_i0CfcA4hm1zes")
    );
}

async function neoDriverClose(){
    console.log("Neo Driver close ")
    driver.close()
}

async function neoConfig(query, params){
    if(driver){
        console.log("Aura connected, Driver Session "+sessionCount+" started!")
    }
    const session = await driver.session();
    sessionCount++;
    try{
        if(query!=""){
        let result = await session.run(query,params)
        return result;
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        await session.close()
        sessionCount--;
    }
}
module.exports = {mongoConfig, mongoDisconnect, neoConfig, neoDriverOpen, neoDriverClose, driver, db};
