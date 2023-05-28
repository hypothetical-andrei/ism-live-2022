import { MongoClient } from 'mongodb'

const url = 'mongodb://root:example@localhost:27017/ismv4?authSource=admin&directConnection=true'

try {
  const client = await MongoClient.connect(url)
  console.log('we are in')
  const db = client.db('ismv4')
  const collection = db.collection('students')
  console.log('INSERT')
  let result = await collection.insertOne({ name: 'Jim', studentNumber: 'AA1' })
  console.log(result)
  result = await collection.findOne({ studentNumber: 'AA1' })
  console.log(result)
  console.log('UPDATE')
  result = await collection.updateOne({ name : 'Jim' }, { $set: { name: 'Jim Smith' } })
  console.log(result)
  result = await collection.findOne({ studentNumber: 'AA1' })
  console.log(result)
  console.log('DELETE')
  result = await collection.deleteOne({ studentNumber: 'AA1' })
  console.log(result)
  await client.close()
} catch (error) {
  console.warn(error)
}