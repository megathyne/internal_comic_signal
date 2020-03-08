variable "profile" {
  type = string
}

provider "aws" {
  region  = "us-east-1"
  profile = var.profile
}

resource "aws_db_instance" "api-dev" {
  allocated_storage = 5
  storage_type      = "gp2"
  engine            = "postgres"
  engine_version    = "11.6"
  instance_class    = "db.t3.micro"
  name              = "dev"
  username            = "postgres"
  password            = "postgres"
  skip_final_snapshot = "true"
}
