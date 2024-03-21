const { app } = require("@azure/functions");
const db = require("./../config/db.config");

app.hook.appStart(async (context) => {
  // initialize connection to db
  try {
    this.db = await db.initializeConnection();
    console.log("db connected success");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    // Handle the error accordingly
  }
  console.log("-----connected to DB Success-----");
});

app.hook.appTerminate((context) => {
  console.log(`-----appTerminate hook executed with hook data `);
});
