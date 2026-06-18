output "dynamodb_table" {
  value = aws_dynamodb_table.release_pulse.name
}

output "lambda_function" {
  value = aws_lambda_function.release_api.function_name
}