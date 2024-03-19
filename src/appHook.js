const { app } = require('@azure/functions');

app.hook.appStart((context) => {
    // add your logic here
    context.log('appStart hook executed');
});

app.hook.appTerminate((context) => {
    // add your logic here
    context.log('appStart end executed');
});