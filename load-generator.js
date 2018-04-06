const cron = require('node-cron')
const MongoDbClient = require('./mongodb-client')

class LoadGenerator {
  constructor() {
    this.tasks = new Map()
  }

  start(id, definition) {
    if (this.tasks.get(id)) throw Error('Job already exists')

    this.tasks.set(
      id,
      cron.schedule('* * * * * * *', async () => {
        console.log(new Date())
        const client = new MongoDbClient(definition)
        await client.execute()
      })
    )
    this.tasks.get(id).start()
  }

  stop(id) {
    if (!this.tasks.get(id)) throw Error('Job does not exist')
    this.tasks.get(id).stop()
    this.tasks.delete(id)
  }
}

const generator = new LoadGenerator()
module.exports = generator
