//라우터
import {Router} from 'express'
import mysql from 'mysql'

export const testRouter = (...args: any[]) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'member_db'
  })
  db.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('connected as id ' + db.threadId)
  })
  const router = Router()

  return router
    .get('/', (req, res) => {
      db.query('SELECT * FROM infor', function (error, results, fields) {
        try {
          res.json({ok: true, body: results})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
    .get('/:id', (req, res) => {
      const {id} = req.params
      db.query(`SELECT * FROM member where id=${id}`, function (error, results, fields) {
        try {
          res.json({ok: true, body: results})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
    .post('/', (req, res) => {
      const {body} = req
      const sqlQuery = `insert into infor set?`
      db.query(sqlQuery, body, function (error, results, fields) {
        try {
          console.log('body', body)
          res.json({ok: true, body})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
    .put('/:id', (req, res) => {
      const {id} = req.params
      const {body} = req
      const sqlQuery = `UPDATE member SET ? where id = ${id}`
      db.query(sqlQuery, body, function (error, results, fields) {
        try {
          res.json({ok: true, body, id})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
    .delete('/:id', (req, res) => {
      const {id} = req.params
      const sqlQuery = `DELETE FROM member WHERE id = ?`
      db.query(sqlQuery, id, function (error, results, fields) {
        try {
          res.json({ok: true, id})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
}
