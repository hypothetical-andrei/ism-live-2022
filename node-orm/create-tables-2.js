import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

const Strudent = sequelize.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'last_name'
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'telephone',
    validate: {
      is: /^\+40\d{9}$/
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'student_list',
  timestamps: false
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