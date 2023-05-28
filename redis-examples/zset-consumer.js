import redis from 'redis'

try {
  const client = redis.createClient()
  await client.connect()
  while (true) {
    const task = await client.bzPopMax('tasks:1', 10)
    if (task) {
      console.log('Received task:')
      console.log(task)
    }
  }
  await client.quit()
} catch (error) {
  console.warn(error)  
}