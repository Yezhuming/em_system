const connection = require('../mysql')

const classSubmission = {
  getAll(req, res) {
    let selectSql = `SELECT eID,experimentName,class,date_format(deadline,'%Y-%m-%d') as deadline,submittedNum,unsubmittedNum FROM classsubmission`
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
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getExperimentList(req, res) {
    let selectSql = 'SELECT DISTINCT eID,experimentName FROM classsubmission'
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
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getClassList(req, res) {
    let selectSql = 'SELECT DISTINCT class FROM classsubmission'
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
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  searchByeIDOrClass(req, res) {
    let selectSql = `SELECT eID,experimentName,class,date_format(deadline,'%Y-%m-%d') as deadline,submittedNum,unsubmittedNum
                     FROM classsubmission WHERE `
    let sqlParams = []
    if (req.query.eID && req.query.class) {
      selectSql += 'eID = ? AND class = ?'
      sqlParams = [req.query.eID, req.query.class]
    } else if (req.query.eID) {
      selectSql += 'eID = ?'
      sqlParams = [req.query.eID]
    } else if (req.query.class) {
      selectSql += 'class = ?'
      sqlParams = [req.query.class]
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
