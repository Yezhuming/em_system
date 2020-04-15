const connection = require('../mysql')

const article = {
  add(req, res) {
    let insertSql = 'INSERT INTO article(title,content,type,pulishDate) VALUES(?,?,?,?)'
    let sqlParams = [req.body.title, req.body.content, req.body.type, req.body.pulishDate]
    connection.query(insertSql, sqlParams, (err) => {
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
  getAll(req, res) {
    let selectSql = 'SELECT * FROM article order by publishDate DESC'
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
  update(req, res) {},
  getByDate(req, res) {},
  deleteOne(req, res) {}
}

module.exports = article
