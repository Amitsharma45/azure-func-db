const { app } = require('@azure/functions');
const taskController = require("../controller/task.controller");
app.http("deleted", {
    methods: ["DELETE"],
    route: "deleted/{id}",
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log(`Http function processed request for url "${req.url}"`);
        if (req.params && req.params.id) {

            const res = await taskController.deleteTask(req.params.id);
            return context.res = {
                status: 200,
                body: res,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        else {
            return context.res = {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
        }
        
    }
});

app.http("getThing", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "things",
    handler: async (req, context) => {
        context.log(`Http function processed request for url "${req.url}"`);
            return context.res = {
                status: 200,
                body: 'testin',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    }
  });
   