import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /hello": "src/lambda.handler",
        "POST /otp/send_email": "src/otp_handlers.send_email",
        "POST /otp/validate_otp": "src/otp_handlers.validate_otp",
      },
    });

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
