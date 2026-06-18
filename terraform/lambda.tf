resource "aws_lambda_function" "release_api" {

  function_name = "release-pulse-api"

  filename = "../build/release-pulse.zip"

  runtime = "nodejs22.x"

  handler = "index.handler"

  role = aws_iam_role.lambda_role.arn

  timeout = 30

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.release_pulse.name
    }
  }
}