const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController')

//後台瀏覽所有餐廳
router.get('/admin/restaurants', adminController.getRestaurants)
//後台瀏覽個別餐廳
router.get('/admin/restaurants/:id', adminController.getRestaurant)
//後臺瀏覽全部類別
router.get('/admin/categories', categoryController.getCategories)
//後臺刪除一筆餐廳資料
router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)

module.exports = router