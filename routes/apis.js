const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController')

//後台瀏覽所有餐廳
router.get('/admin/restaurants', adminController.getRestaurants)
//後台新增一筆餐廳資料
router.post('/admin/restaurants', upload.single('image'), adminController.postRestaurant)
//後台瀏覽個別餐廳
router.get('/admin/restaurants/:id', adminController.getRestaurant)
router.put('/admin/restaurants/:id', upload.single('image'), adminController.putRestaurant)
//後臺刪除一筆餐廳資料
router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)

//後臺瀏覽全部類別
router.get('/admin/categories', categoryController.getCategories)
//後台新增一筆類別資料
router.post('/admin/categories', categoryController.postCategory)
//後臺編輯一筆類別資料
router.put('/admin/categories/:id', categoryController.putCategory)
//後臺刪除一筆類別資料
router.delete('/admin/categories/:id', categoryController.deleteCategory)

module.exports = router