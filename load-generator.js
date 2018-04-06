const cron = require('node-cron')
const MongoDbClient = require('./mongodb-client')

module.exports = class {
  constructor() {
    this.tasks = new Map()
  }

  start(id, definition) {
    if (this.tasks[id] != null) return

    this.tasks[id] = cron.schedule('* * * * * * *', async() => {
      console.log(new Date())
      const client = new MongoDbClient(definition)
      await client.execute()
    })
    this.tasks[id].start()
  }

  stop(id) {
    if (this.tasks[id] != null) return
    this.tasks[id].stop()
  }
}
