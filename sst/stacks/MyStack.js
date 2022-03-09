import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a DynamoDB table
    const table = new sst.Table(this, "OTPs", {
      fields: {
        user: sst.TableFieldType.STRING,
        secret: sst.TableFieldType.STRING,
        otp_counter: sst.TableFieldType.INTEGER,
      },
      primaryIndex: { partitionKey: "user" },
    })

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          tableName: table.dynamodbTable.tableName,
        },
      },
      routes: {
        "GET /hello": "src/lambda.handler",
        "POST /otp/send_email": "src/otp_handlers.send_email",
        "POST /otp/validate_otp": "src/otp_handlers.validate_otp",
      },
    });

    api.attachPermissions([table]);
    api.attachPermissions(['ses:SendEmail', 'SES:SendRawEmail']);

    // Create the frontend app
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      environment: {
        REACT_APP_API_URL: api.url,
      },
    });

    this.addOutputs({
      "ApiEndpoint": api.url,
      "SiteUrl": site.url,
    });
  }
}
