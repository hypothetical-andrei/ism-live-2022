import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

const Restaurant = sequelize.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  openingHour: {
    type: Sequelize.TIME,
    allowNull: false
  },
  closingHour: {
    type: Sequelize.TIME,
    allowNull: false
  }
})