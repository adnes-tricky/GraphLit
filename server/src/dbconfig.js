const mongoose = require("mongoose");
Promise  = require('bluebird');
mongoose.Promise = Promise;
const neo4j=require('neo4j-driver')
var driver, db;
let sessionCount=0;
// var Mongoose = require('mongoose/lib').Mongoose;
async function mongoConfig() {
    const connectionParams={
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
    mongoose.connect(process.env.MONGO_URI,connectionParams)
        .then( () => {
            console.log('Mongoose Connected to the database cluster ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
  }
  

async function mongoDisconnect(){
    delete mongoose.connection.models['Image'];
    delete mongoose.connection.collections['Image'];
    //delete mongoose.connection.base.modelSchemas['Image'];
    await mongoose.connection.close().then(() => {
        console.log('Mongoose connection to cluster disconnected');
        process.exit(0);
      }).catch((error) => {
        console.error('Error occurred while closing connection: ', error);
        process.exit(1);
      });
}

async function neoDriverOpen(){
    console.log("Neo driver open")
    driver=neo4j.driver(
        process.env.NEO4J_URI,
        neo4j.auth.basic(process.env.NEO4J_USERNAME,process.env.NEO4J_PASSWORD)
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
