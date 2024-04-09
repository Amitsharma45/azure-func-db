const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env.AzureCommunicationConnectionString;
const client = new EmailClient(connectionString);

const sendEmail = async (subject, plainText, to, context) => {
  try {
    const emailMessage = {
      senderAddress: process.env.EmailSenderAddress,
      content: {
        subject: subject,
        plainText: plainText,
      },
      recipients: {
        to: [{ address: to }],
      },
    };

    const poller = await client.beginSend(emailMessage);
    await poller.pollUntilDone();

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        status: 200,
        message: "Email Sent!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

module.exports = {
  sendEmail,
};
