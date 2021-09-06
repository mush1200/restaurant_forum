const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const db = require('../models') 
const Restaurant = db.Restaurant
const Category = db.Category
const User = db.User

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  }
}

module.exports = adminService