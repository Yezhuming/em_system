const connection = require('../mysql')

const resourse = {
  getAll(req, res) {
    let selectSql = `SELECT rID,fileName,fileType,url,date_format(uploadDate,'%Y-%m-%d') as uploadDate FROM resource order by uploadDate DESC`
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
  upload(req, res) {
    console.log(req.files[0])
    let insertSql = 'INSERT INTO resource(fileName,fileType,url,uploadDate) VALUES(?,?,?,?)'
    let sqlParams = [req.files[0].filename, req.body.type, req.files[0].path, req.body.uploadDate]
    connection.query(insertSql, sqlParams, err => {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message)
      } else {
        let response = {
          status: 200,
          result: '上传成功！'
        }
        res.end(JSON.stringify(response))
      }
    })
  },
  getListByDate(req, res) {},
  deleteByrID(req, res) {},
  getByTypeLimited(req, res) {},
  getLimited(req, res) {}
}

module.exports = resourse
