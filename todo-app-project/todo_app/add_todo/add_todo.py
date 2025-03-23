import json
import os
from uuid import uuid4
import boto3


table_name = os.getenv("TODO_TABLE_NAME")


db_client = boto3.client("dynamodb")


def todo_builder(todo_id: str, task: str) -> dict:
    return {
        "todo_id": {"S": todo_id},
        "task": {"S": task},
        "is_completed": {"S": "False"}
    }


def put_into_db(todo: dict):
    db_client.put_item(
        TableName=table_name,
        Item=todo
    )


def lambda_handler(event, context):
    print("Event: ", event)
    task = json.loads(event["body"]).get("task")
    todo_id = uuid4().hex
    new_todo = todo_builder(todo_id=todo_id, task=task)
    put_into_db(new_todo)
    return {
        "statusCode": 201,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization"
        },
        "body": "Item uploaded"
    }
