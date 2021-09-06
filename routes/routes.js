const express = require('express')
const router = express.Router()

const helpers = require('../_helpers')

const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const passport = require('../config/passport')


const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
  if (helpers.getUser(req).isAdmin) { return next() }
    return res.redirect('/')
  }
  res.redirect('/signin')
}  
//如果使用者訪問首頁，就導向 /restaurants 的頁面
router.get('/', authenticated, (req, res) => res.redirect('/restaurants'))

//在前台瀏覽全部餐廳清單
router.get('/restaurants', authenticated, restController.getRestaurants)
//在前台顯示最新評論
router.get('/restaurants/feeds', authenticated, restController.getFeeds)
//在前台瀏覽收藏人數最多的10間餐廳
router.get('/restaurants/top', authenticated, restController.getTopRestaurant)
//在前台瀏覽一筆餐廳資料
router.get('/restaurants/:id', authenticated, restController.getRestaurant)
//在前台瀏覽一筆餐廳資料的dashboard
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)

//在前台留下一筆餐廳資料評論資料
router.post('/comments', authenticated, commentController.postComment)
//權限者可在前台刪除一筆餐廳評論資料
router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
//在前台瀏覽追蹤人數前10名使用者
router.get('/users/top', authenticated, userController.getTopUser)
//在前台瀏覽個人基本資料
router.get('/users/:id', authenticated, userController.getUser)
//在前台編輯個人基本資料
router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, upload.single('image'),userController.putUser)

//在前台把一筆餐廳加入我的最愛、移除我的最愛
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)
//在前台Like、移除like一筆餐廳
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)
//在前台追蹤、取消追蹤一筆餐廳
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)
// 連到 /admin 頁面就轉到 /admin/restaurants
router.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))

// 在 /admin/restaurants 底下則交給 adminController.getRestaurants 處理
router.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)

//在後台瀏覽使用者
router.get('/admin/users', authenticatedAdmin, adminController.getUsers)
//在後台更改使用者權限
router.put('/admin/users/:id/toggleAdmin', authenticatedAdmin, adminController.toggleAdmin)

//後台新增一筆餐廳資料
router.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
router.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
//後台瀏覽一筆餐廳資料
router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
//後臺編輯一筆餐廳資料
router.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
router.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
//後臺刪除一筆餐廳資料
router.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)
//後臺瀏覽所有類別資料
router.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
//後台新增一筆類別資料
router.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)
//後臺編輯一筆類別資料
router.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)
router.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)
//後臺刪除一筆類別資料
router.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)
//註冊
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
  //登入
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)
  
module.exports = router
