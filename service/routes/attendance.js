const connection = require('../mysql')
const fs = require('fs')
const nodeExcel = require('excel-export')

const attendance = {
  init(account) {
    let selectSql = 'SELECT sID,name,grade,class,tID,teacher FROM student WHERE account = ?'
    connection.query(selectSql, account, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        let insertSql = 'INSERT INTO attendance(sID,name,grade,class,account,tID,teacher) VALUES (?,?,?,?,?,?,?)'
        let sqlParams = [result[0].sID, result[0].name, result[0].grade, result[0].class, account, result[0].tID, result[0].teacher]
        connection.query(insertSql, sqlParams, err => {
          if (err) {
            console.log('[INSERT ERROR] - ', err.message)
          } else {
            console.log('初始化考勤数据成功')
          }
        })
      }
    })
  },
  getAll(req, res) {
    let selectSql = `SELECT sID,name,grade,class,account,loginTimes,date_format(lastLoginDate,'%Y-%m-%d %H:%i:%s') as lastLoginDate FROM attendance WHERE teacher = ?`
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
  },
  search(req, res) {
    let selectSql = 'SELECT * FROM attendance WHERE '
    let sqlParams = []
    if (req.query.gradeAndClass && req.query.value) {
      selectSql += '(grade = ? AND class = ?) AND (account = ? OR name = ?)'
      let grade = req.query.gradeAndClass.substring(0, 5)
      let Class = req.query.gradeAndClass.substring(5) // class不可用
      sqlParams = [grade, Class, req.query.value, req.query.value]
    } else if (req.query.gradeAndClass) {
      let grade = req.query.gradeAndClass.substring(0, 5)
      let Class = req.query.gradeAndClass.substring(5)
      selectSql += 'grade = ? AND class = ?'
      sqlParams = [grade, Class]
    } else if (req.query.value) {
      selectSql += 'account = ? OR name = ?'
      sqlParams = [req.query.value, req.query.value]
    }
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
        caption: '学生年级',
        type: 'String'
      },
      {
        caption: '学生班级',
        type: 'String'
      },
      {
        caption: '学生学号',
        type: 'String'
      },
      {
        caption: '登录次数',
        type: 'String'
      },
      {
        caption: '最近一次登录日期',
        type: 'String',
        width: 20
      }
    ]
    // 定义row的数据
    conf.rows = []
    let acceptData = req.body.excelData
    for (let i = 0; i < acceptData.length; i++) {
      let row = []
      row.push(acceptData[i].name)
      row.push(acceptData[i].grade)
      row.push(acceptData[i].class)
      row.push(acceptData[i].account)
      row.push(acceptData[i].loginTimes + '次')
      if (acceptData[i].lastLoginDate == null) {
        row.push('暂未登录')
      } else {
        row.push(acceptData[i].lastLoginDate)
      }
      conf.rows.push(row)
    }
    console.log(conf.rows)
    let result = nodeExcel.execute(conf)
    let path = `public/exportExcel/${new Date().getTime()}-Record.xlsx`
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

module.exports = attendance
