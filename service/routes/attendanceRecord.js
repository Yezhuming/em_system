const connection = require('../mysql')

const attendanceRecord = {
  handleQuit(req, res) {
    console.log(req.body)
    let updateSql = 'UPDATE attendancerecord SET quitTime = ? WHERE rID = ?'
    let sqlParams = [req.body.quitTime, req.body.rID]
    connection.query(updateSql, sqlParams, err => {
      if (err) {
        res.end('[UPDATE ERROR] -', err.message)
      } else {
        res.end('更新成功')
      }
    })
  },
  getRecords(req, res) {
    let selectSql = `SELECT rID,sID,name,account,date_format(loginDate, '%Y-%m-%d') as loginDate,loginTime,quitTime FROM attendancerecord WHERE sID = ?`
    let sqlParams = [req.query.sID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        res.end('[SELECT ERROR] -', err.message)
      } else {
        if (result.length != 0) {
          console.log(result)
          for (let item of result) {
            let timeDiff = item.quitTime - item.loginTime
            let leave1 = timeDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000))
            hours = hours < 10 ? '0' + hours : hours
            let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000))
            minutes = minutes < 10 ? '0' + minutes : minutes
            let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
            let seconds = Math.round(leave3 / 1000)
            seconds = seconds < 10 ? '0' + seconds : seconds
            item.loginDuration = hours + ':' + minutes + ':' + seconds
          }
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

module.exports = attendanceRecord
