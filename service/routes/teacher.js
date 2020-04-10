const connection = require('../mysql')

const teacher = {
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
          res.end('账号或密码错误！')
        }
      }
    })
  }
}

module.exports = teacher
