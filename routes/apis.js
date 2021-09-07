const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController.js')

//瀏覽所有餐廳
router.get('/admin/restaurants', adminController.getRestaurants)
//瀏覽個別餐廳
router.get('/admin/restaurants/:id', adminController.getRestaurant)

module.exports = router