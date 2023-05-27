// DELIMITER $$
// CREATE PROCEDURE concatenate_with_date(IN str VARCHAR(255), OUT result VARCHAR(255))
// BEGIN
//   SET result = CONCAT(str, ' - ', DATE_FORMAT(NOW(), '%Y-%m-%d'));
// END $$
// DELIMITER ;
import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '172.19.0.2',
  database: 'ismv4',
  user: 'root',
  password: 'welcome123'
})

const inputString = 'Hello!'

await connection.query('call concatenate_with_date(?, @output)', [inputString])

const [rows, _] = await connection.query('select @output as result')

console.log(rows)

await connection.destroy()