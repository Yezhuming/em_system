var express = require('express')
var router = express.Router()
const admin = require('./admin')
const teacher = require('./teacher')
const student = require('./student')
const article = require('./article')

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
router.get('/article/getByDate', article.getByDate)
router.post('/article/deleteOne', article.deleteOne)

module.exports = router
