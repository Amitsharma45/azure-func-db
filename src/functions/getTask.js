const { app } = require("@azure/functions");
const taskController = require("../controller/task.controller");

app.http("getTask", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const res = await taskController.getTasks();
    return context.res = {
      status: 200,
      body:  JSON.stringify(res),
      headers: {
        "Content-Type": "application/json",
      },
    };
    },
});
