import { MongoClient } from 'mongodb'

const url = 'mongodb://root:example@localhost:27017/ismv4?authSource=admin&directConnection=true'

try {
  const client = await MongoClient.connect(url)
  console.log('we are in')
  await client.close()
} catch (error) {
  console.warn(error)
}