const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient

module.exports = class MongoDBClient {
  constructor(definition) {
    this.definition = definition
  }

  async execute() {
    const client = await MongoClient.connect(this.definition.mongo)
    const db = await client.db(this.definition.db)
    const items = await db.collection(this.definition.collection)
    console.log('Connected successfully to server')

    if (this.definition.query.type === 'insert') {
      await this.insert(items)
    } else {
      console.log('Nothing to do...')
    }
    client.close()
  }

  async insert(items) {
    const document = this.definition.query.document
    const documents = []
    const times = this.definition.query.times
    _.range(times).forEach(it => documents.push(Object.assign({}, document)))
    const inserted = await items.insertMany(documents)
    // console.log(`Inserted ${JSON.stringify(inserted)}`)
  }
}
