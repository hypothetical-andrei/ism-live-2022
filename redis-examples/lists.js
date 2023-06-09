import redis from 'redis'
import { v4 as uuid } from 'uuid'

try {
  const client = redis.createClient()
  await client.connect()
  await client.del('asset:1')
  await client.lPush('asset:1', 'a')
  await client.lPush('asset:1', 'b')
  await client.lPush('asset:1', 'c')
  await client.lPush('asset:1', 'd')
  await client.lPush('asset:1', 'e')
  let result = await client.lPop('asset:1')
  // console.log(result)
  result = await client.lRange('asset:1', 2, 4)
  // console.log(result)
  const id = uuid()
  let len = await client.lLen('asset:1')
  let remaining = await client.lRange('asset:1', 0, len)
  console.log(remaining)
  await client.lSet('asset:1', 2, id)
  await client.lRem('asset:1', 1, id)
  len = await client.lLen('asset:1')
  remaining = await client.lRange('asset:1', 0, len)
  console.log(remaining)
  await client.quit()
} catch (error) {
  console.warn(error)  
}