const { app } = require('@azure/functions');
const taskController = require("../controller/task.controller");

app.http('createTasks', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log(`Http function processed request for url "${req.url}"`);

        if (req.body) {
            const body = await req.json();
            const task = body;
            context.log("------task----", task)
            const res = await taskController.createTask(task);
            context.log("------res----done----")
            return context.res = {
                status: 200,
                body: JSON.stringify(res),
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
