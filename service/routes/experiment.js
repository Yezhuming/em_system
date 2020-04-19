const connection = require('../mysql')
const fs = require('fs')

const experiment = {
  getAll(req, res) {
    let selectSql = `SELECT eID,experimentName,experimentUrl,date_format(uploadDate,'%Y-%m-%d') as uploadDate,date_format(deadline,'%Y-%m-%d') as deadline
                     FROM experiment order by uploadDate DESC`
    connection.query(selectSql, (err, result) => {
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
  upload(req, res) {
    console.log(req.files[0])
    let insertSql = 'INSERT INTO experiment(experimentName,experimentUrl,uploadDate,deadline) VALUES(?,?,?,?)'
    let sqlParams = [req.files[0].filename, req.files[0].path, req.body.uploadDate, req.body.deadline]
    connection.query(insertSql, sqlParams, err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '上传成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  getListByDate(req, res) {
    let selectSql = `SELECT eID,experimentName,experimentUrl,date_format(uploadDate,'%Y-%m-%d') as uploadDate,date_format(deadline,'%Y-%m-%d') as deadline
                     FROM experiment WHERE uploadDate = ?`
    let sqlParams = [req.query.uploadDate]
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
    let selectSql = 'SELECT experimentUrl FROM experiment WHERE eID = ?'
    let sqlParams = [req.body.eID]
    connection.query(selectSql, sqlParams, (err, result) => {
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
              connection.query(deleteSql, sqlParams, err => {
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
  },
  getLimited(req, res) {}
}

module.exports = experiment
