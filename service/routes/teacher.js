const connection = require('../mysql')

const teacher = {
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
  }
}

module.exports = teacher