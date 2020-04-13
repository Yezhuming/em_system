const connection = require('../mysql')

const student = {
  seachOne(req, res) {
    let selectSql = 'SELECT * FROM student WHERE uID = ?'
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
            result: '不存在此学生'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  login(req, res) {
    let selectSql = 'SELECT * FROM student WHERE account = ? AND password = ?'
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
          res.end('账号或密码错误！')
        }
      }
    })
  },
  updatePassword(req, res) {
    let updateSql = 'UPDATE student SET password = ? WHERE uID = ?'
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

module.exports = student
