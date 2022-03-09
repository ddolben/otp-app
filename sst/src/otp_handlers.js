import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function send_email(event) {
  const data = JSON.parse(event.body);

  // Grab the email from the request.
  const email = data.email;

  let otp_secret = null;
  let otp_counter = 0;

  // Grab the user's entry in the database, if it exists.
  const get_params = {
    TableName: process.env.tableName,
    Key: {
      user: email,
    },
  };
  const get_result = await dynamoDb.get(get_params).promise();
  if (get_result.Item) {
    otp_secret = get_result.Item.secret;
    otp_counter = get_result.Item.otp_counter;
  }

  // If we don't have a secret, generate one based on the username and a random value.
  if (otp_secret === null) {
    otp_secret = "ABCDE"
  }

  // Generate an OTP based on the secret and the next counter value.
  otp_counter++;
  //const otp = 12345;

  // Write the counter and secret to dynamoDB.
  const write_params = {
    TableName: process.env.tableName,
    Item: {
      user: email,
      secret: otp_secret,
      otp_counter: otp_counter,
    },
  };

  try {
    await dynamoDb.put(write_params).promise();

    // TODO: send email

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
}

export async function validate_otp(event) {
  /*const data =*/ JSON.parse(event.body);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "is_valid": false,
    }),
  };
}