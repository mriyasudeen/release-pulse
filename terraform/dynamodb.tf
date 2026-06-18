resource "aws_dynamodb_table" "release_pulse" {

  name         = "release-pulse"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Project = "release-pulse"
    Owner   = "mriyasudeen"
  }
}