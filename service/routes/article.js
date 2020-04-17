const connection = require('../mysql')

const article = {
  add(req, res) {
    let insertSql = 'INSERT INTO article(title,content,type,publishDate) VALUES(?,?,?,?)'
    let sqlParams = [req.body.title, req.body.content, req.body.type, req.body.publishDate]
    connection.query(insertSql, sqlParams, err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '发布成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  getAll(req, res) {
    let selectSql = `SELECT aID,title,content,type,date_format(publishDate,'%Y-%m-%d') as publishDate FROM article order by publishDate DESC;`
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
  update(req, res) {
    let updateSql = 'UPDATE article SET title = ?, content = ?, type = ?, publishDate = ? WHERE aID = ?'
    let sqlParams = [req.body.title, req.body.content, req.body.type, req.body.publishDate, req.body.aID]
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
  getListByDate(req, res) {
    let selectSql = `SELECT aID,title,content,type,date_format(publishDate,'%Y-%m-%d') as publishDate 
                     FROM article WHERE publishDate = ?;`
    let sqlParams = [req.query.publishDate]
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
            result: '该日期没有发布通知或公告'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  deleteByaID(req, res) {
    let deleteSql = 'DELETE FROM article where aID = ?'
    let sqlParams = [req.body.aID]
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
  getByTypeLimited(req, res) {
    let countSql = 'SELECT count(*) as total FROM article WHERE type = ?;'
    let sqlParams = [req.query.type]
    connection.query(countSql, sqlParams, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
      } else {
        let total = result[0].total
        if (total != 0) {
          let selectSql = `SELECT aID,title,content,type,date_format(publishDate,'%Y-%m-%d') as publishDate 
                           FROM article WHERE type = ? order by publishDate DESC limit ?,?`
          let startIndex = req.query.page * req.query.size - req.query.size
          let sqlParams = [req.query.type, startIndex, Number(req.query.size)]
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
              }
            }
          })
        } else {
          let response = {
            status: -1,
            total: 0,
            result: '该表无数据'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  },
  getLimited(req, res) {
    let selectSql = `SELECT aID,title,content,type,date_format(publishDate,'%Y-%m-%d') as publishDate 
    FROM article order by publishDate DESC limit 0,5`
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
  getContentByaID(req, res) {
    let selectSql = `SELECT aID,title,content,type,date_format(publishDate,'%Y-%m-%d') as publishDate FROM article WHERE aID = ?`
    let sqlParams = [req.query.aID]
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
            result: '不存在此文章！'
          }
          res.end(JSON.stringify(response))
        }
      }
    })
  }
}

module.exports = article
