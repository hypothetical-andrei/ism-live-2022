import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '172.19.0.2',
  database: 'ismv4',
  user: 'root',
  password: 'welcome123'
})

await connection.execute('insert into students (first_name, last_name, telephone, email) values (?, ?, ?, ?)', ['clara', 'smith', '111-111', 'cl2@etc.com'])

let [rows, _] = await connection.query('select * from students');

console.log(rows);

await connection.destroy()