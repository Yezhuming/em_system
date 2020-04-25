const connection = require('../mysql')

const attendance = {
  init(account) {
    let selectSql = 'SELECT sID,name,grade,class,tID,teacher FROM student WHERE account = ?'
    connection.query(selectSql, account, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return false
      } else {
        let insertSql = 'INSERT INTO attendance(sID,name,grade,class,account,tID,teacher) VALUES (?,?,?,?,?,?,?)'
        let sqlParams = [result[0].sID, result[0].name, result[0].grade, result[0].class, account, result[0].tID, result[0].teacher]
        connection.query(insertSql, sqlParams, err => {
          if (err) {
            console.log('[INSERT ERROR] - ', err.message)
          } else {
            console.log('初始化考勤数据成功')
            return true
          }
        })
      }
    })
  },
  getAll(req, res) {
    let selectSql = `SELECT sID,name,grade,class,account,loginTimes,date_format(lastLoginDate,'%Y-%m-%d') as lastLoginDate FROM attendance WHERE teacher = ?`
    // let grade = req.query.gradeAndClass.substring(0, 5)
    // let Class = req.query.gradeAndClass.substring(5) // class不可用
    // sqlParams = [grade, Class]
    let sqlParams = [req.query.teacher]
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
        }
      }
    })
  }
}

module.exports = attendance
