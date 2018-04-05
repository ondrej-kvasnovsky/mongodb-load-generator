const cron = require('node-cron');
const MongoDbClient = require('./mongodb-client');

module.exports = class {
  constructor() {
    this.tasks = {}
  }

  start(id, definition) {
    if (this.tasks[id] != null) return;

    const task = cron.schedule('* * * * * * *', function () {
      console.log(new Date());
      const client = new MongoDbClient(definition);
      client.execute()
    });
    this.tasks[id] = task;
    task.start();
  }

  stop(id) {
    if (this.tasks[id] != null) return;
    this.tasks[id].stop();
  }
}