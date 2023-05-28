import redis from 'redis'
import readline from 'readline'

function askQuestion(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  })
  return new Promise(resolve => rl.question(query, ans => {
      rl.close()
      resolve(ans)
  }))
}

try {
  const client = redis.createClient()
  await client.connect()
  while (true) {
    const value = await askQuestion('Task -> ')
    if (value.trim() === 'quit') {
      break
    }
    client.publish('task_topic:1', value)
  }
  await client.quit()
} catch (error) {
  console.warn(error)  
}