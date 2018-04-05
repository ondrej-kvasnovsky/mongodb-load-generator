const MongoClient = require('mongodb').MongoClient;

module.exports = class {
  constructor(definition) {
    this.definition = definition
  }

  execute() {
    const url = 'mongodb://localhost:27017,127.0.0.1:27018/?replicaSet=rs0';
    const dbName = 'test';
    MongoClient.connect(url, function (err, client) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      const items = db.collection('items');

      let doc = [
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()},
        {ukulele: Math.random()}
      ];
      console.log(doc)
      items.insertMany(doc, function (err, r) {
        if (err) {
          console.log(err);
          return;
        }
        client.close();
      });
    });
  }
}