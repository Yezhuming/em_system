var express = require('express')
var multer = require('multer')
var router = express.Router()
const admin = require('./admin')
const teacher = require('./teacher')
const student = require('./student')
const article = require('./article')
const resource = require('./resource')

// 管理员信息表
router.post('/admin/login', admin.login)

// 教师信息表
router.post('/teacher/login', teacher.login)
router.get('/teacher/getOne', teacher.getOne)
router.post('/teacher/updatePassword', teacher.updatePassword)

// 学生信息表
router.post('/student/login', student.login)
router.get('/student/getOne', student.getOne)
router.post('/student/updatePassword', student.updatePassword)

// 通知公告表
router.post('/article/add', article.add)
router.get('/article/getAll', article.getAll)
router.post('/article/update', article.update)
router.get('/article/getListByDate', article.getListByDate)
router.post('/article/deleteByaID', article.deleteByaID)
router.get('/article/getByTypeLimit', article.getByTypeLimit)
router.get('/article/getContentByaID', article.getContentByaID)
router.get('/article/getLimited', article.getLimited)

// 资源信息表
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resource/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // 设置保存的文件名
  }
})
var upload = multer({ storage: storage })
router.get('/resource/getAll', resource.getAll)
router.post('/resource/upload', upload.any(), resource.upload)
router.get('/resource/getListByDate', resource.getListByDate)
router.get('/resource/getByTypeLimit', resource.getByTypeLimited)
router.post('/resource/deleteByrID', resource.deleteByrID)
router.get('/resource/getLimited', resource.getLimited)

module.exports = router
