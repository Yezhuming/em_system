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
    if (req.query.class && req.query.value) {
      selectSql += 'class = ? AND (account = ? OR name = ?)'
      sqlParams = [req.query.class, req.query.value, req.query.value]
    } else if (req.query.class) {
      selectSql += 'class = ?'
      sqlParams = [req.query.class]
    } else if (req.query.value) {
      selectSql += 'account = ? OR name = ?'
      sqlParams = [req.query.value]
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
  },
  addOne(req, res) {
    let insertSql = 'INSERT INTO student(account,password,name,role,grade,class,discipline,teacher) VALUES(?,?,?,?,?,?,?,?)'
    let sqlParams = [req.body.account, req.body.password, req.body.name, req.body.role, req.body.grade, req.body.class, req.body.discipline, req.body.teacher]
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
  addFromFile(req, res) { // TODO
    let obj = xlsx.parse(`public/user/${req.files[0].filename}`)
    let data = obj[0].data
    let insertSql = 'INSERT INTO student(account,password,name,role,grade,class,discipline) VALUES ?'
    let sqlParams = data.slice(1)
    connection.query(insertSql, [sqlParams], err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        // let response = {
        //   status: 200,
        //   result: '导入成功！'
        // }
        // res.end(JSON.stringify(response))
      }
    })
  },
  updateByuID(req, res) {
    let updateSql = 'UPDATE student SET account=?,password=?,name=?,grade=?,class=?,discipline=?,teacher=? WHERE uID=?'
    let sqlParams = [req.body.account, req.body.password, req.body.name, req.body.grade, req.body.class, req.body.discipline, req.body.teacher, req.body.uID]
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
    let deleteSql = 'DELETE FROM student WHERE uID = ?'
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
    let deleteSql = `DELETE FROM student WHERE uID IN (${req.body.uIDArray})`
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
    let selectSql = 'SELECT DISTINCT class FROM student'
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
