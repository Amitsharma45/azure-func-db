const { app } = require('@azure/functions');  
const db = require('./../config/db.config');

app.hook.appStart((context) => {
    try{
        // initialize connection to db
        db.initializeConnection();
        console.log("-----connected to DB Success-----");
    }catch(error){
        console.log("-----error---- in db connection----");
        console.log("-----error",error);
    }
});

app.hook.appTerminate((context) => {
    console.log(`-----appTerminate hook executed with hook data `);
});
