# MongoDB Load Generator

Generates continuous load against a mongo database. 

## How to run

```
$ npm install
... installs all required dependencies
$ npm start
Started: http://localhost:4444
```

## How to use

Trigger a load generator via REST API. 

```
curl -X "POST" "http://localhost:4444/test" \
     -H 'Content-Type: text/plain; charset=utf-8' \
     -d $'{
  "mongo": "mongodb://localhost:27017,127.0.0.1:27018/?replicaSet=rs0",
  "db": "test",
  "collection": "items",
  "query": {
    "type": "insert",
    "document": "{\\"ukulele\\": 1}",
    "times": 5
  }
}'
```
