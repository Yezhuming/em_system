const connection = require('../mysql')
const fs = require('fs')

const resourse = {
  getAll(req, res) {
    let selectSql = `SELECT rID,fileName,fileType,url,date_format(uploadDate,'%Y-%m-%d') as uploadDate FROM resource order by uploadDate DESC`
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
    let insertSql = 'INSERT INTO resource(fileName,fileType,url,uploadDate) VALUES(?,?,?,?)'
    let sqlParams = [req.files[0].filename, req.body.type, req.files[0].path, req.body.uploadDate]
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
    let selectSql = `SELECT rID,fileName,fileType,url,date_format(uploadDate,'%Y-%m-%d') as uploadDate
                     FROM resource WHERE uploadDate = ?`
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
            result: '该日期没有上传资源！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  deleteByrID(req, res) {
    let selectSql = 'SELECT url FROM resource WHERE rID = ?'
    let sqlParams = [req.body.rID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          let path = result[0].url
          path = path.replace(/\\/g, '/')
          fs.unlink(path, err => {
            if (err) {
              let response = {
                status: -1,
                result: '删除失败！'
              }
              res.end(JSON.stringify(response))
            } else {
              let deleteSql = 'DELETE FROM resource WHERE rID = ?'
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
  getByTypeLimited(req, res) {
    let countSql = 'SELECT count(*) as total FROM resource WHERE fileType = ?;'
    let sqlParams = [req.query.type]
    connection.query(countSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        let total = result[0].total
        if (total != 0) {
          let selectSql = `SELECT rID,fileName,fileType,url,date_format(uploadDate,'%Y-%m-%d') as uploadDate
                           FROM resource WHERE fileType = ? order by uploadDate DESC limit ?,?`
          let startIndex = req.query.page * req.query.size - req.query.size
          let sqlParams = [req.query.type, startIndex, Number(req.query.size)]
          connection.query(selectSql, sqlParams, (err, result) => {
            if (err) {
              console.log('[SELECT ERROR] - ', err.message)
            } else {
              let response = {
                status: 200,
                total: total,
                result: result
              }
              res.end(JSON.stringify(response))
            }
          })
        } else {
          let response = {
            status: -1,
            total: 0,
            result: '该表无数据！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getLimited(req, res) {
    let selectSql = `SELECT rID,fileName,fileType,url,date_format(uploadDate,'%Y-%m-%d') as uploadDate 
                     FROM resource order by uploadDate DESC limit 0,5`
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
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  }
}

module.exports = resourse
