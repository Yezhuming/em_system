const connection = require('../mysql')

const classSubmission = {
  getAll(req, res) {
    let selectSql = `SELECT eID,experimentName,class,grade,date_format(deadline,'%Y-%m-%d') as deadline,submittedNum,unsubmittedNum
                     FROM classsubmission
                     WHERE teacher = ?
                     ORDER BY deadline ASC`
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
        } else {
          let response = {
            status: -1,
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getExperimentList(req, res) {
    let selectSql = 'SELECT DISTINCT eID,experimentName FROM classsubmission WHERE teacher = ?'
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
        } else {
          let response = {
            status: -1,
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getClassList(req, res) {
    let selectSql = 'SELECT DISTINCT class,grade FROM classsubmission WHERE teacher = ?'
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
        } else {
          let response = {
            status: -1,
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  searchByeIDOrClass(req, res) {
    let selectSql = `SELECT eID,experimentName,class,grade,date_format(deadline,'%Y-%m-%d') as deadline,submittedNum,unsubmittedNum
                     FROM classsubmission WHERE `
    let sqlParams = []
    if (req.query.eID && req.query.gradeAndClass) {
      selectSql += 'eID = ? AND grade = ? AND class = ? ORDER BY deadline ASC'
      let grade = req.query.gradeAndClass.substring(0, 5)
      let Class = req.query.gradeAndClass.substring(5) // class不可用
      sqlParams = [req.query.eID, grade, Class]
    } else if (req.query.eID) {
      selectSql += 'eID = ? ORDER BY deadline ASC'
      sqlParams = [req.query.eID]
    } else if (req.query.gradeAndClass) {
      selectSql += 'grade = ? AND class = ? ORDER BY deadline ASC'
      let grade = req.query.gradeAndClass.substring(0, 5)
      let Class = req.query.gradeAndClass.substring(5)
      sqlParams = [grade, Class]
    }
    connection.query(selectSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.sql)
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
            result: '暂无数据！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  }
}

module.exports = classSubmission
