import mysql from 'mysql2/promise'

const pool = await mysql.createPool({
  host: '172.19.0.2',
  database: 'ismv4',
  user: 'app1',
  password: 'welcome123',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 5,
  idleTimeout: 100000,
  queueLimit: 1
})

let [rows, _] = await pool.query('insert into students (first_name, last_name, telephone, email) values ("jane", "smith", "222-222", "j3@etc.com")')

console.log(rows);

[rows, _] = await pool.query('select * from students');

console.log(rows);

try {
  await pool.query('insert into students (first_name, last_name, telephone, email) values ("jane", "smith", "222-222", "j2@etc.com")')
} catch (error) {
  console.log(error)
}

await pool.end()