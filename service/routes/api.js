var express = require('express')
var multer = require('multer')
var router = express.Router()

// 导入路由
const admin = require('./admin')
const teacher = require('./teacher')
const student = require('./student')
const article = require('./article')
const resource = require('./resource')
const experiment = require('./experiment')
const classSubmission = require('./classSubmission')
const score = require('./score')
const attendance = require('./attendance')
const attendanceRecord = require('./attendanceRecord')

// 管理员信息表
router.post('/admin/login', admin.login)
router.get('/admin/getOne', admin.getOne)
router.post('/admin/updatePassword', admin.updatePassword)

// 教师信息表
var userStorage = multer.diskStorage({ // 保存批量导入学生和教师的excel文件
  destination: function (req, file, cb) {
    cb(null, 'public/user/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // 设置保存的文件名
  }
})
var userUpload = multer({ storage: userStorage })
router.post('/teacher/login', teacher.login)
router.get('/teacher/searchByName', teacher.searchByName)
router.get('/teacher/getAll', teacher.getAll)
router.get('/teacher/getOne', teacher.getOne)
router.post('/teacher/addOne', teacher.addOne)
router.post('/teacher/addFromFile', userUpload.any(), teacher.addFromFile)
router.post('/teacher/updateBytID', teacher.updateBytID)
router.post('/teacher/updatePassword', teacher.updatePassword)
router.post('/teacher/deleteBytID', teacher.deleteBytID)
router.post('/teacher/deleteByidArray', teacher.deleteByidArray)

// 学生信息表
router.post('/student/login', student.login)
router.get('/student/search', student.search)
router.get('/student/getAll', student.getAll)
router.get('/student/getOne', student.getOne)
router.post('/student/addOne', student.addOne)
router.post('/student/addFromFile', userUpload.any(), student.addFromFile)
router.post('/student/updateBysID', student.updateBysID)
router.post('/student/updatePassword', student.updatePassword)
router.post('/student/deleteBysID', student.deleteBysID)
router.post('/student/deleteByidArray', student.deleteByidArray)
router.get('/student/getClassList', student.getClassList)

// 通知公告表
router.post('/article/add', article.add)
router.get('/article/getAll', article.getAll)
router.post('/article/update', article.update)
router.get('/article/getListByDate', article.getListByDate)
router.post('/article/deleteByatID', article.deleteByatID)
router.get('/article/getByTypeLimited', article.getByTypeLimited)
router.get('/article/getContentByatID', article.getContentByatID)
router.get('/article/getLimited', article.getLimited)

// 资源信息表
var resourceStorage = multer.diskStorage({ // 保存资源文件
  destination: function (req, file, cb) {
    cb(null, 'public/resource/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // 设置保存的文件名
  }
})
var resourceUpload = multer({ storage: resourceStorage })
router.get('/resource/getAll', resource.getAll)
router.post('/resource/upload', resourceUpload.any(), resource.upload)
router.get('/resource/getListByDate', resource.getListByDate)
router.get('/resource/getByTypeLimited', resource.getByTypeLimited)
router.post('/resource/deleteByrID', resource.deleteByrID)
router.get('/resource/getLimited', resource.getLimited)

// 实验内容表
var experimentStorage = multer.diskStorage({ // 保存上传的实验课件
  destination: function (req, file, cb) {
    cb(null, 'public/experiment/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // 设置保存的文件名
  }
})
var experimentUpload = multer({ storage: experimentStorage })
router.get('/experiment/getAll', experiment.getAll)
router.post('/experiment/upload', experimentUpload.any(), experiment.upload)
router.get('/experiment/getListByDate', experiment.getListByDate)
router.post('/experiment/deleteByeID', experiment.deleteByeID)

// 班级提交实验情况表
router.get('/classSubmission/getAll', classSubmission.getAll)
router.get('/classSubmission/getExperimentList', classSubmission.getExperimentList)
router.get('/classSubmission/getClassList', classSubmission.getClassList)
router.get('/classSubmission/searchByeIDOrClass', classSubmission.searchByeIDOrClass)

// 各班成绩表
var submitFileStorage = multer.diskStorage({ // 保存学生上传的作业
  destination: function (req, file, cb) {
    cb(null, 'public/submitFile/') // 文件保存的路径
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // 设置保存的文件名
  }
})
var fileUpload = multer({ storage: submitFileStorage })
// router.post('/score/init', score.init)
router.get('/score/getByeIDAndClassAndGrade', score.getByeIDAndClassAndGrade)
router.post('/score/deleteByeID', score.deleteByeID)
router.get('/score/getLimited', score.getLimited)
router.post('/score/upload', fileUpload.any(), score.upload)
router.post('/score/check', score.check)

// 考勤管理表
router.get('/attendance/getAll', attendance.getAll)
router.get('/attendance/search', attendance.search)
router.post('/attendance/exportExcel', attendance.exportExcel)

// 各学生考勤记录
router.post('/attendanceRecord/update', attendanceRecord.handleQuit)
router.get('/attendanceRecord/getRecords', attendanceRecord.getRecords)
router.post('/attendanceRecord/exportExcel', attendanceRecord.exportExcel)

module.exports = router
