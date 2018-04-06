const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient
const BSON = require('bson')

module.exports = class MongoDBClient {
  constructor(definition) {
    this.definition = definition
  }

  async execute() {
    const client = await MongoClient.connect(this.definition.mongo)
    const db = await client.db(this.definition.db)
    const items = await db.collection(this.definition.collection)
    console.log('Connected successfully to server')

    const document = JSON.parse(this.definition.query.document)
    const documents = []
    const times = this.definition.query.times
    _.range(times).forEach(it => documents.push(Object.assign({}, document)))
    if (this.definition.query.type === 'insert') {
      const inserted = await items.insertMany(documents)
      console.log(`Inserted ${JSON.stringify(inserted)}`)
    } else {
      console.log('Nothing to do...')
    }
  }
}
