import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

try {
  await sequelize.authenticate()
  console.log('we are connected')
} catch (error) {
  console.warn(error)
} finally {
  await sequelize.close()
}