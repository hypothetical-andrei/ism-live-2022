import redis from 'redis'

try {
  const client = redis.createClient()
  await client.connect()
  await client.set('user:name:1', 'jim')
  await client.set('user:count:1', 0)
  await client.incr('user:count:1')
  let result = await client.get('user:count:1')
  console.log(result)
  result = await client.getSet('user:name:1', 'john')
  console.log(result)
  await client.append('user:name:1', ' Smith')
  result = await client.get('user:name:1')
  console.log(result)
  let len = await client.strLen('user:name:1')
  console.log(len)
  result = await client.getRange('user:name:1', 5, len)
  console.log(result)
  await client.quit()
} catch (error) {
  console.warn(error)  
}