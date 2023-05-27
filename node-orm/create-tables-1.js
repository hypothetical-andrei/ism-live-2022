import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

const Author = sequelize.define('author', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

try {
  await sequelize.sync({
    force: true
  })
} catch (error) {
  console.warn(error)
} finally {
  await sequelize.close()
}