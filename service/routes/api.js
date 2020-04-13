var express = require('express')
var router = express.Router()
const admin = require('./admin')
const teacher = require('./teacher')
const student = require('./student')

// 管理员信息表
router.post('/admin/login', admin.login)

// 教师信息表
router.post('/teacher/login', teacher.login)
router.get('/teacher/seachOne', teacher.seachOne)
router.post('/teacher/updatePassword', teacher.updatePassword)

// 学生信息表
router.post('/student/login', student.login)
router.get('/student/seachOne', student.seachOne)
router.post('/student/updatePassword', student.updatePassword)

module.exports = router
