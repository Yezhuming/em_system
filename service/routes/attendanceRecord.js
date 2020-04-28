const connection = require('../mysql')
const fs = require('fs')
const nodeExcel = require('excel-export')

const attendanceRecord = {
  handleQuit(req, res) {
    console.log(req.body)
    let updateSql = 'UPDATE attendancerecord SET quitTime = ? WHERE rcID = ?'
    let sqlParams = [req.body.quitTime, req.body.rcID]
    connection.query(updateSql, sqlParams, err => {
      if (err) {
        res.end('[UPDATE ERROR] -', err.message)
      } else {
        res.end('更新成功')
      }
    })
  },
  getRecords(req, res) {
    let selectSql = `SELECT rcID,sID,name,account,date_format(loginDate, '%Y-%m-%d %H:%i:%s') as loginDate,loginTime,quitTime FROM attendancerecord WHERE sID = ?`
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
  },
  exportExcel(req, res) {
    let conf = {}
    // 定义sheet名称
    conf.name = 'ALL'
    // 定义列的名称以及数据类型
    conf.cols = [
      {
        caption: '学生姓名',
        type: 'String'
      },
      {
        caption: '学生学号',
        type: 'String'
      },
      {
        caption: '登录日期',
        type: 'String'
      },
      {
        caption: '登录时长',
        type: 'String'
      }
    ]
    // 定义row的数据
    conf.rows = []
    let acceptData = req.body.excelData
    for (let i = 0; i < acceptData.length; i++) {
      let row = []
      // acceptData[i] = JSON.parse(acceptData[i])
      row.push(acceptData[i].name)
      row.push(acceptData[i].account)
      row.push(acceptData[i].loginDate)
      row.push(acceptData[i].loginDuration)
      conf.rows.push(row)
    }
    console.log(conf.rows)
    let result = nodeExcel.execute(conf)
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    // res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx')
    // res.end(result, 'binary')
    let path = `public/exportExcel/${new Date().getTime()}-personalRecord.xlsx`
    fs.writeFile(path, result, 'binary', err => {
      if (err) {
        console.log(err)
      } else {
        let response = {
          status: 200,
          path: path.slice(6)
        }
        res.end(JSON.stringify(response))
      }
    })
  }
}

module.exports = attendanceRecord
