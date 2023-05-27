import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'app1',
  password: 'welcome123',
  database: 'ismv4'
})

const Restaurant = sequelize.define('Restaurant', {
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

const Location = sequelize.define('Location', {
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Menu = sequelize.define('Menu', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const MenuItem = sequelize.define('MenuItem', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

Restaurant.hasMany(Location)
Location.belongsTo(Restaurant)

Restaurant.hasOne(Menu)
Menu.belongsTo(Restaurant)

Menu.belongsToMany(MenuItem, { through: 'MenuItemMapping' })
MenuItem.belongsToMany(Menu, { through: 'MenuItemMapping' })

