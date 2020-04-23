const connection = require('../mysql')
const xlsx = require('node-xlsx')

const student = {
  getAll(req, res) {
    let selectSql = 'SELECT * FROM student'
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
    let selectSql = 'SELECT * FROM student WHERE sID = ?'
    let sqlParams = [req.query.sID]
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
          let response = {
            status: -1,
            result: '账号或密码错误！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  search(req, res) {
    let selectSql = 'SELECT * FROM student WHERE '
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
  updatePassword(req, res) {
    let updateSql = 'UPDATE student SET password = ? WHERE sID = ?'
    let sqlParams = [req.body.newPassword, req.body.sID]
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
    let selectSql = 'SELECT name FROM teacher WHERE tID = ?'
    let sqlParams = [req.body.tID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          let teacher = result[0].name
          let insertSql = 'INSERT INTO student(account,password,name,role,grade,class,discipline,tID,teacher) VALUES(?,?,?,?,?,?,?,?,?)'
          let sqlParams = [req.body.account, req.body.password, req.body.name, req.body.role, req.body.grade, req.body.class, req.body.discipline, req.body.tID, teacher]
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
        } else {
          let response = {
            status: -1,
            result: '不存在此教师'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  addFromFile(req, res) {
    let selectSql = 'SELECT name FROM teacher WHERE tID = ?'
    let sqlParams = [req.body.tID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          let teacher = result[0].name
          let obj = xlsx.parse(`public/user/${req.files[0].filename}`)
          let data = obj[0].data
          let sqlParams = data.slice(1)
          for (let i = 0; i < sqlParams.length; i++) {
            sqlParams[i].push(req.body.tID, teacher)
          }
          let insertSql = 'INSERT INTO student(account,password,name,role,grade,class,discipline,tID,teacher) VALUES ?'
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
        }
      }
    })
  },
  updateBysID(req, res) {
    let selectSql = 'SELECT name FROM teacher WHERE tID = ?'
    let sqlParams = [req.body.tID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        let teacher = result[0].name
        let updateSql = 'UPDATE student SET account=?,password=?,name=?,grade=?,class=?,discipline=?,tID=?,teacher=? WHERE sID=?'
        let sqlParams = [req.body.account, req.body.password, req.body.name, req.body.grade, req.body.class, req.body.discipline, req.body.tID, teacher, req.body.sID]
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
      }
    })
  },
  deleteBysID(req, res) {
    let deleteSql = 'DELETE FROM student WHERE sID = ?'
    let sqlParams = [req.body.sID]
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
  deleteByidArray(req, res) {
    let deleteSql = `DELETE FROM student WHERE sID IN (${req.body.idArray})`
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
  },
  getClassList(req, res) {
    let selectSql = 'SELECT DISTINCT class,grade FROM student'
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
            result: '无数据!'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  }
}

module.exports = student
