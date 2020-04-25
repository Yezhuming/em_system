const connection = require('../mysql')
const score = require('./score')
const fs = require('fs')

const experiment = {
  getAll(req, res) {
    let selectSql = `SELECT eID,experimentName,experimentUrl,uploader,date_format(uploadDate,'%Y-%m-%d') as uploadDate,date_format(deadline,'%Y-%m-%d') as deadline
                     FROM experiment WHERE uploader = ? order by uploadDate DESC`
    let sqlParams = [req.query.uploader]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          let response = {
            status: 200,
            result: result
          }
          res.end(JSON.stringify(response))
        } else {
          let response = {
            status: -1,
            result: '该表无数据！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  upload(req, res) { // 带上发布人参数
    let insertSql = 'INSERT INTO experiment(experimentName,experimentUrl,uploader,uploadDate,deadline) VALUES(?,?,?,?,?)'
    let sqlParams = [req.files[0].filename, req.files[0].path, req.body.uploader, req.body.uploadDate, req.body.deadline]
    const promise = new Promise((resolve, reject) => {
      connection.query(insertSql, sqlParams, err => { // 插入实验内容
        if (err) {
          console.log('[INSERT ERROR] - ', err.message)
        } else {
          let selectSql = `SELECT eID,date_format(deadline,'%Y-%m-%d') as deadline FROM experiment WHERE experimentName = ?`
          let sqlParams = [req.files[0].filename]
          connection.query(selectSql, sqlParams, (err, result) => { // 查询刚插入的实验eID和deadline(参数)
            if (err) {
              console.log('[SELECT ERROR] - ', err.message)
            } else {
              if (result.length != 0) {
                let eID = result[0].eID
                let deadline = result[0].deadline
                let selectSql = 'SELECT DISTINCT class,grade FROM student WHERE teacher = ?'
                let sqlParams = [req.body.uploader]
                let classSubmissionList = []
                connection.query(selectSql, sqlParams, (err, result) => { // 查询现有班级数量
                  if (err) {
                    console.log('[SELECT ERROR] - ', err.message)
                  } else {
                    if (result.length != 0) {
                      classSubmissionList = result
                      for (let i = 0; i < classSubmissionList.length; i++) {
                        let selectSql = 'SELECT COUNT(*) as count FROM student WHERE class = ? AND grade = ?'
                        let sqlParams = [classSubmissionList[i].class, classSubmissionList[i].grade]
                        connection.query(selectSql, sqlParams, (err, result) => { // 查询各班级人数(参数)
                          if (err) {
                            console.log('[SELECT ERROR] - ', err.message)
                          } else {
                            if (result.length != 0) { // 填充参数
                              let insertSql = 'INSERT INTO classsubmission(eID,experimentName,class,grade,teacher,deadline,submittedNum,unsubmittedNum) VALUES(?,?,?,?,?,?,?,?)'
                              let sqlParams = [eID, req.files[0].filename, classSubmissionList[i].class, classSubmissionList[i].grade, req.body.uploader, deadline, 0, result[0].count]
                              connection.query(insertSql, sqlParams, err => { // 插入数据至班级提交情况表(初始化数据)
                                if (err) {
                                  console.log('[INSERT ERROR] - ', err.message)
                                } else {
                                  if (i == classSubmissionList.length - 1) {
                                    resolve(eID)
                                  }
                                }
                              })
                            }
                          }
                        })
                      }
                    }
                  }
                })
              }
            }
          })
        }
      })
    })
    promise.then(value => {
      score.init(value, res)
      console.log('上传成功！')
      res.end()
    })
  },
  getListByDate(req, res) {
    let selectSql = `SELECT eID,experimentName,experimentUrl,date_format(uploadDate,'%Y-%m-%d') as uploadDate,date_format(deadline,'%Y-%m-%d') as deadline
                     FROM experiment WHERE uploadDate = ? AND uploader = ?`
    let sqlParams = [req.query.uploadDate, req.query.uploader]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          let response = {
            status: 200,
            result: result
          }
          res.end(JSON.stringify(response))
        } else {
          let response = {
            status: -1,
            result: '该日期没有上传实验！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  deleteByeID(req, res) {
    let deleteSql = 'DELETE FROM classsubmission WHERE eID = ?'
    let sqlParams = [req.body.eID]
    connection.query(deleteSql, sqlParams, err => { // 删除实验提交表中该实验的数据
      if (err) {
        console.log('[DELETE ERROR] - ', err.message)
      } else {
        let selectSql = 'SELECT experimentUrl FROM experiment WHERE eID = ?'
        let sqlParams = [req.body.eID]
        connection.query(selectSql, sqlParams, (err, result) => { // 删除服务器中的文件
          if (err) {
            console.log('[SELECT ERROR] - ', err.message)
          } else {
            if (result.length != 0) {
              let path = result[0].experimentUrl
              path = path.replace(/\\/g, '/')
              fs.unlink(path, err => {
                if (err) {
                  let response = {
                    status: -1,
                    result: '删除失败！'
                  }
                  res.end(JSON.stringify(response))
                } else {
                  let deleteSql = 'DELETE FROM experiment WHERE eID = ?'
                  connection.query(deleteSql, sqlParams, err => { // 删除实验表中的数据
                    if (err) {
                      console.log('[DELETE ERROR] - ', err.message)
                    } else {
                      let response = {
                        status: 200,
                        result: '删除成功！'
                      }
                      res.end(JSON.stringify(response))
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }
}

module.exports = experiment
