const connection = require('../mysql')

const score = {
  init(eID, res) {
    let selectSql = 'SELECT eID,experimentName,class,grade FROM classsubmission WHERE eID = ?'
    connection.query(selectSql, eID, (err, result) => { // 查询班级数量
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        if (result.length != 0) {
          for (let i = 0; i < result.length; i++) {
            let selectSql = 'SELECT sID FROM student WHERE class = ? AND grade = ?'
            let sqlParams = [result[i].class, result[i].grade]
            let eID = result[i].eID
            let experimentName = result[i].experimentName
            connection.query(selectSql, sqlParams, (err, result) => {
              if (err) {
                console.log('[SELECT ERROR] - ', err.message)
              } else {
                for (let i = 0; i < result.length; i++) {
                  let insertSql = 'INSERT INTO score(eID,experimentName,sID) VALUES(?,?,?)'
                  let sqlParams = [eID, experimentName, result[i].sID]
                  connection.query(insertSql, sqlParams, err => {
                    if (err) {
                      console.log('[INSERT ERROR] - score', err.message)
                    } else {
                      console.log('各学生实验情况初始化成功')
                    }
                  })
                }
              }
            })
          }
        }
      }
    })
  },
  getByeIDAndClassAndGrade(req, res) {
    let selectSql = `SELECT eID,experimentName,student.class,student.grade,student.name,student.account,status,score,comment,submitFile
                     FROM score INNER JOIN student
                     ON score.sID =  student.sID
                     WHERE eID = ? AND student.class = ? AND student.grade = ?`
    let sqlParams = [req.query.eID, req.query.class, req.query.grade]
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
            result: '无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  deleteByeID(req, res) {
    let deleteSql = 'DELETE FROM score WHERE eID = ?'
    let sqlParams = [req.body.eID]
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
  getLimited(req, res) {
    let selectSql = 'SELECT count(*) as total FROM score WHERE sID = ?'
    let sqlParams = [req.query.sID]
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        let total = result[0].total
        if (total != 0) {
          let selectSql = `SELECT experiment.eID,experiment.experimentName,date_format(deadline,'%Y-%m-%d') as deadline,status,score,comment,submitFile
                           FROM score INNER JOIN experiment
                           ON score.eID =  experiment.eID
                           WHERE sID = ?
                           order by deadline ASC limit ?,?`
          let startIndex = req.query.page * req.query.size - req.query.size
          let sqlParams = [req.query.sID, startIndex, Number(req.query.size)]
          connection.query(selectSql, sqlParams, (err, result) => {
            if (err) {
              console.log('[SELECT ERROR] - ', err.message)
            } else {
              if (result.length != 0) {
                let response = {
                  status: 200,
                  total: total,
                  result: result
                }
                res.end(JSON.stringify(response))
              } else {
                let response = {
                  status: -1,
                  total: 0,
                  result: '该表无数据！'
                }
                res.end(JSON.stringify(response))
              }
            }
          })
        }
      }
    })
  },
  submitFile(req, res) {},
  check(req, res) {}
}

module.exports = score
