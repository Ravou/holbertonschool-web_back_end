#!/usr/bin/env python3
// Script that lists all databases in MongoDB


from pymongo import MongoClient


def list_databases():
    // Connect to the MongoDB server (default localhost:27017)
    client = MongoClient()

    // List database names
    dbs = client.list_database_names()

    for db in dbs:
        print(db)


if __name__ == "__main__":
    list_databases()

