import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '172.19.0.2',
  database: 'ismv4',
  user: 'root',
  password: 'welcome123'
})


const regularUserInput = 'j1@etc.com'

const hostileUserInput1 = "' or 1=1;#"

const hostileUserInput2 = "' or 1=1 union select user from mysql.user;#"

let [rows, _] = await connection.execute('select last_name from students where email=?', [hostileUserInput2])

console.warn(rows)

await connection.destroy()