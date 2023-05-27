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

try {
  await sequelize.sync({ force: true })
  const restaurant1 = await Restaurant.create({
    name: 'Restaurant 1',
    openingHour: '10:00',
    closingHour: '17:00'
  })
  const restaurant2 = new Restaurant({
    name: 'Restaurant 2',
    openingHour: '11:00',
    closingHour: '23:00'
  })
  await restaurant2.save()
  await restaurant1.update({
    name: 'Updated restaurant 1'
  })
  const location1 = await Location.create({
    street: 'some street',
    number: '1A',
    city: 'Los Angeles'
  })
  await restaurant1.addLocation(location1)
  const location2 = await Location.create({
    street: 'some ave',
    number: '2A',
    city: 'Miami'
  })
  await restaurant2.addLocation(location2)

    // Add a menu to each restaurant
  const menu1 = await Menu.create({ description: 'Menu 1' })
  await restaurant1.setMenu(menu1)
  const menu2 = await Menu.create({ description: 'Menu 2' })
  await restaurant2.setMenu(menu2)

  // Add two items to each menu; the items should be different
  const menuItem11 = await MenuItem.create({ description: 'MenuItem 11', price: 10.99 })
  const menuItem12 = await MenuItem.create({ description: 'MenuItem 12', price: 12.99 })
  await menu1.addMenuItem([menuItem11, menuItem12])

  const menuItem21 = await MenuItem.create({ description: 'MenuItem 21', price: 8.99 })
  const menuItem22 = await MenuItem.create({ description: 'MenuItem 22', price: 9.99 })
  await menu2.addMenuItem([menuItem21, menuItem22])

  const menuItemShared = await MenuItem.create({ description: 'Shared MenuItem', price: 18.99 })
  await menu1.addMenuItem(menuItemShared)
  await menu2.addMenuItem(menuItemShared)
  
  const location3 = await Location.create({
    street: 'some ave',
    number: '2A',
    city: 'Topeka'
  })
  await restaurant1.addLocation(location3)
  
  await restaurant1.removeLocation(location3)
  await location3.destroy()

} catch (error) {
  console.warn(error)
}
