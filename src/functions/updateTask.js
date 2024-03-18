const { app } = require('@azure/functions');
const taskController = require("../controller/task.controller");

// const express = require('express');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.http('updateTask', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log(`Http function processed request for url "${req.url}"`);

        if (req.body) {
            const data = await req.json();
            console.log("-=------body", data);
            
            // const task = body;
            // console.log("-------->", task);
            // const res = await taskController.updateTask(task);
            return context.res = {
                status: 200,
                body: JSON.stringify('ss'),
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
