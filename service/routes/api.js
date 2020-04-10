var express = require('express')
var router = express.Router()
const admin = require('./admin')
const teacher = require('./teacher')

// 管理员信息表
router.post('/admin/login', admin.login)

// 教师信息表
router.post('/teacher/login', teacher.login)

// 学生信息表

module.exports = router
