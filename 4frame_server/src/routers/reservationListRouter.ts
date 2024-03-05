//라우터
import {Router} from 'express'
import mysql from 'mysql'

export const reservationListRouter = (...args: any[]) => {
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

  return router.get('/:id', (req, res) => {
    const {id} = req.params
    db.query(
      `SELECT * FROM reservation_manage where userNumber='${id}'`,
      function (error, results, fields) {
        try {
          console.log(results)
          res.json({results})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      }
    )
  })
}
