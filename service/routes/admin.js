const connection = require('../mysql')

const admin = {
  login(req, res) {
    let selectSql = 'SELECT * FROM admin WHERE account = ? AND password = ?'
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
  }
}

module.exports = admin
