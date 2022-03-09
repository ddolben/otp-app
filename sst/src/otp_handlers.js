import AWS from "aws-sdk";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { hotp } from "otplib";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const g_email_source = "driver13+aws@gmail.com";

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
  const otp_token = hotp.generate(otp_secret, otp_counter);

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

    // Send the OTP via email.
    const email_body = "Your one-time password: " + otp_token;
    const region = "us-east-1";  // TODO: get this from configuration
    const sesClient = new SESClient({ region: region });
    const email_params = {
      Destination: {
        ToAddresses: [
          email,
        ],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: email_body,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "One-Time Password",
        },
      },
      Source: g_email_source,
    };

    await sesClient.send(new SendEmailCommand(email_params));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        token: otp_token,
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
  // Grab the token from the request body.
  const data = JSON.parse(event.body);
  const email = data.email;
  const otp_token = data.token;

  // Grab the secret and counter from the database.
  const get_params = {
    TableName: process.env.tableName,
    Key: {
      user: email,
    },
  };
  const get_result = await dynamoDb.get(get_params).promise();
  if (!get_result.Item) {
    throw new Error("failed to find user");
  }
  const otp_secret = get_result.Item.secret;
  const otp_counter = get_result.Item.otp_counter;

  // Validate the OTP.
  const is_valid = hotp.check(otp_token, otp_secret, otp_counter);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "is_valid": is_valid,
    }),
  };
}