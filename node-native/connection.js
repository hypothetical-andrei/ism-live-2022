import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '172.19.0.2',
  database: 'ismv4',
  user: 'root',
  password: 'welcome123'
})

console.warn('we are in')

await connection.destroy()