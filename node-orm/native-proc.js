import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

try {
  const q = 'select * from Restaurants';
  let results = await sequelize.query(q)
  console.log(results)
  const sp = 'call concatenate_with_date(?, @result)'
  await sequelize.query(sp, {
    replacements: [ 'Hello!' ], 
    type: sequelize.QueryTypes.RAW 
  })
  results = await sequelize.query('select @result as result', { plain: true})
  console.log(results)
} catch (error){
  console.warn(error)
}