// acts a s a client for the Mongo server: require(node-driver) the MongoCLient obj (built in)
const MongoClient = require('mongodb').MongoClient

//core Node Module - tbd
const assert = require('assert').strict

// db server connection
const url = 'mongodb://localhost:27017/'

// db name to connect to
const dbname = 'nucampsite'

// acts as a URL, , callback(errors, client) client connects to db
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  // check that there are no errors - if assert fails it terminates with logging to console
  console.log(`Error: ${err}`)
  assert.strictEqual(err, null)

  // if assert passes, this prints to console
  console.log('Connected correctly to server')

  // client is available via MongoClient and has a `db` method that points at the dbName we defined above
  console.log(`Client: ${client}`)
  const db = client.db(dbname)

  // drops all campsites, and reseeds - purely for dev/testing purposes. not production code
  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null)
    console.log('Dropped Collection', result)

    const collection = db.collection('campsites')

    collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
    (err, result) => {
      assert.strictEqual(err, null)
      console.log('Insert Document:', result.ops)

      collection.find().toArray((err, docs) => {
        assert.strictEqual(err, null)
        console.log('Found Documents:', docs)

        // terminates connection
        client.close()
      })
    })
  })
})