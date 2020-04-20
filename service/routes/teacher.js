const connection = require('../mysql')
const xlsx = require('node-xlsx')

const teacher = {
  getAll(req, res) {
    let selectSql = 'SELECT * FROM teacher'
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
  getOne(req, res) {
    let selectSql = 'SELECT * FROM teacher WHERE uID = ?'
    let sqlParams = [req.query.uID]
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
            result: '不存在此教师！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  login(req, res) {
    let selectSql = 'SELECT * FROM teacher WHERE account = ? AND password = ?'
    let sqlParams = [req.body.account, req.body.password]
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
            result: '账号或密码错误！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  searchByName(req, res) {
    let selectSql = 'SELECT * FROM teacher WHERE name = ?'
    let sqlParams = [req.query.value]
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
            result: '不存在该用户！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  updatePassword(req, res) {
    let updateSql = 'UPDATE teacher SET password = ? WHERE uID = ?'
    let sqlParams = [req.body.newPassword, req.body.uID]
    connection.query(updateSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message)
      } else {
        let response = {
          status: 200
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  addOne(req, res) {
    let insertSql = 'INSERT INTO teacher(account,password,role,name) VALUES(?,?,?,?)'
    let sqlParams = [req.body.account, req.body.password, req.body.role, req.body.name]
    connection.query(insertSql, sqlParams, err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '新增成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  addFromFile(req, res) {
    let obj = xlsx.parse(`public/user/${req.files[0].filename}`)
    let data = obj[0].data
    let insertSql = 'INSERT INTO teacher(account,password,role,name) VALUES ?'
    let sqlParams = data.slice(1)
    connection.query(insertSql, [sqlParams], err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '导入成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  updateByuID(req, res) {
    let updateSql = 'UPDATE teacher SET account = ?, password = ?, name = ? WHERE uID = ?'
    let sqlParams = [req.body.account, req.body.password, req.body.name, req.body.uID]
    connection.query(updateSql, sqlParams, err => {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '修改成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  deleteByuID(req, res) {
    let deleteSql = 'DELETE FROM teacher WHERE uID = ?'
    let sqlParams = [req.body.uID]
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
  },
  deleteByuIDArray(req, res) {
    let deleteSql = `DELETE FROM teacher WHERE uID IN (${req.body.uIDArray})`
    connection.query(deleteSql, err => {
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
}

module.exports = teacher
