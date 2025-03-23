import json
import os
import boto3


table_name = os.getenv("TODO_TABLE_NAME")


db_client = boto3.client("dynamodb")


def get_all_todos():
    response = db_client.scan(
        TableName=table_name
    )
    items = response["Items"]
    return [{key: value["S"] for key, value in item.items()} for item in items]


def lambda_handler(event, context):
    todos = get_all_todos()
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization"
        },
        "body": json.dumps(todos)
    }
