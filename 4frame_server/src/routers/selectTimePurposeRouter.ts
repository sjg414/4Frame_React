import {Router} from 'express'
import mysql from 'mysql'

export const selectTimePurposeRouter = (...args: any[]) => {
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

  return router.post('/', (req, res) => {
    const {userNumber, time, purpose} = req.body
    const {tableName} = req.body
    const dayRoom = tableName.split('_')
    db.query(
      `select * from member where userNumber='${userNumber}'`,
      function (error, results, fields) {
        try {
          if (error) throw error
          console.log('select result', results.body)
          console.log('dayRoom', dayRoom)
          const newBody = {
            userName: results[0].userName,
            userNumber,
            phoneNumber: results[0].phoneNumber,
            day: dayRoom[0],
            room: dayRoom[2],
            time,
            purpose
          }
          console.log(newBody)
          db.query(
            `insert into reservation_manage set ?`,
            newBody,
            function (error, results, fields) {
              if (error) throw error
              console.log('insert results', results)
              res.json({ok: true, results})
            }
          )
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      }
    )
  })
}
