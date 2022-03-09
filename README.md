# OTP Demo App

A simple full-stack web app demonstrating login-with-OTP functionality. Frontend uses React.js,
backend uses Node.js, DynamoDB, SES for email sending, and Serverless Stack (SST) for infrastructure
and deployment.

# Development

## AWS Credentials

You'll need AWS credentials to deploy anything to AWS using SST. Currently they are read from `aws-config.txt` and `aws-credentials.txt` in the project's root directory. Format is exactly the same as the `config` and `credentials` file that the AWS CLI expects on your local machine (the two files are mounted there in the Docker container).

## Local Development

The author recommends using `Docker` to run the application locally and execute all commands, to
keep the development environment self-contained. To build a dev docker container run

```
./scripts/docker-build.sh
```

and enter the Docker dev environment with

```
./scripts/docker-run.sh
```

## Deploying to cloud

To deploy to the cloud, run the following within the Docker environment in the `sst` directory:

```
npx sst deploy --stage prod
```

# This I would add

* Failure handling on API calls (and a UI response)
* Proper login session management
* Input format validation (e.g. is this an email addres)