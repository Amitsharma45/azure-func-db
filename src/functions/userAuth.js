const { app } = require("@azure/functions");
const jwt = require("jsonwebtoken");
app.http("login", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    try {
      
      const jwtSecretKey = "sdsfsg";
      const expiresIn = "7d";
  
      const token = jwt.sign({ email: "sharma.amit@gmail.com" }, jwtSecretKey, {
        expiresIn,
      });
      console.log({req})
      const tokenValue = token;
    //   console.log(tokenValue);
  
      return (context.res = {
        status: 200,
        body: JSON.stringify({
          message:
            "Please pass a name on the query string or in the request body",
          tokenValue: tokenValue,
        }),
      });
    } catch (err) {
      console.log(err);
      return (context.res = {
        status: 400,
        body: "Please pass a name on the query string or in the request body",
      });
    }
  },
});

async function userLogin (req, context){
  try {
    const jwtSecretKey = "sdsfsg";
    const expiresIn = "7d";

    const token = jwt.sign({ email: "sharma.amit@gmail.com" }, jwtSecretKey, {
      expiresIn,
    });

    const tokenValue = token;
    // console.log(tokenValue);

    context.res.cookie("jwt_token_customer", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        sameSite: "strict",
    });

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message:
          "Please pass a name on the query string or in the request body",
        tokenValue: tokenValue,
      }),
    });
  } catch (err) {
    console.log(err);
    return (context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body",
    });
  }
};

// async (context, req) => {
// Ensure that context.res is initialized
//   if (!context.res) {
//     context.res = {};
//   }
// Set the token as a cookie using the Set-Cookie header
//   context.res.headers = {
//     "Set-Cookie": `jwt_token_customer=${token}; Expires=${new Date(Date.now() + 25892000000).toUTCString()}; HttpOnly; SameSite=Strict`
//   };
//   context.log(`Http function processed request for url "${req.url}"`);
//   const name = req.query.name || (await req.body) || "world";
//   },
