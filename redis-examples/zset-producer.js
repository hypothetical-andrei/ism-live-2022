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
    const value = await askQuestion('Value priority -> ')
    if (value.trim() === 'quit') {
      break
    }
    const [item, priority] = value.trim().split(' ')
    await client.zAdd('tasks:1', [{ score: priority, value: item }])
    const len = await client.zCount('tasks:1', 0, '+inf')
    const content = await client.zRange('tasks:1', 0, len)
    console.log('CURRENT CONTENT')
    console.log(content)
  }
  await client.quit()
} catch (error) {
  console.warn(error)  
}