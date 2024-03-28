const { sendEmail } = require("../config/send-email");

// Define the inviteUser function
const inviteUser = async (request, context) => {
  try {
    const body = await request.json();
    const { email, name } = body;

    const emailSubject = `You have been invited to SymphoMe by ${name}!`;
    const emailBody =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis tristique nisl, eget bibendum lorem consectetur et.";

    // Call sendEmail function
    const emailResponse = await sendEmail(
      emailSubject,
      emailBody,
      email,
      context
    );

    // Check if email was sent successfully
    if (emailResponse.status === 200) {
      // Return a success response for user invitation
      return (context.res = {
        status: 200,
        body: JSON.stringify({
          status: 200,
          message: "User invited successfully and email sent.",
          emailResponse: emailResponse.body, // Include email response in the message
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Return an error response if email sending failed
      return (context.res = {
        status: 500,
        body: JSON.stringify({
          status: 500,
          message: "Failed to invite user. Error occurred while sending email.",
          emailError: emailResponse.body, // Include email error message in the response
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    // Return an error response if any exception occurred
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        status: 500,
        message: "Internal Server Error1",
        error: error.message, // Include the error message in the response
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Export the inviteUser function
module.exports = {
  inviteUser,
};
