const { app } = require('@azure/functions');

app.hook.preInvocation((context) => {
    context.log('preInvocation hook executed');
    if (context.invocationContext.options.trigger.type === 'httpTrigger') {
        context.invocationContext.log(
            `preInvocation hook executed for http function ${context.invocationContext.functionName}`
        );
    }
});

app.hook.postInvocation((context) => {
    context.log('postInvocation hook executed');
    if (context.invocationContext.options.trigger.type === 'httpTrigger') {
        context.invocationContext.log(
            `postInvocation hook executed for http function ${context.invocationContext.functionName}`
        );
    }
});