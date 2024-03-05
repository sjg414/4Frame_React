import {Router} from 'express'
import mysql from 'mysql'

export const selectDayClassRouter = (...args: any[]) => {
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

  // return router
  //   .get('/', (req, res) => {
  //     db.query('SELECT * FROM infor', function (error, results, fields) {
  //       try {
  //         res.json({ok: true, body: results})
  //       } catch (e) {
  //         if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
  //       }
  //     })
  //   })
  //   .get('/:name', (req, res) => {
  //     const {name} = req.params
  //     db.query(
  //       `SELECT * FROM infor where name='${name}'`,
  //       function (error, results, fields) {
  //         try {
  //           if (error) throw error
  //           console.log(results)
  //           res.json({ok: true, body: results})
  //         } catch (e) {
  //           if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
  //         }
  //       }
  //     )
  //   })
  //   .post('/', (req, res) => {
  //     const {body} = req
  //     const sqlQuery = `insert into infor set?`
  //     db.query(sqlQuery, body, function (error, results, fields) {
  //       try {
  //         console.log('selectDayClass body', body)
  //         res.json({ok: true, body})
  //       } catch (e) {
  //         if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
  //       }
  //     })
  //   })

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
      db.query(`SELECT time FROM ${id}`, function (error, results, fields) {
        try {
          console.log('results', results)
          res.json({results})
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
    .post('/', (req, res) => {
      const {name, room, day} = req.body
      const week = name.substring(
        name.indexOf('_') + 1,
        name.indexOf('_', name.indexOf('_') + 1)
      )
      const {body} = req
      const sqlQuery = `SELECT * FROM infor where name='${name}'`

      db.query(sqlQuery, function (error, results, fields) {
        try {
          if (error) throw error
          if (results.length > 0) {
            //name 존재 시, name의 table 가져오기
            console.log('results1', results[0])
            db.query(`select * from ${name}`, function (error, results, fields) {
              if (error) throw error
              console.log('results2', results[0])
              res.json({ok: true, body: results})
            })
          } else {
            //name 없을 시, 컬럼 삽입 및 새 테이블 생성
            db.query(`insert into infor set ?`, body, function (error, results, fields) {
              if (error) throw error
              console.log('results3', results[0])
            })
            db.query(
              `create table ${name} (time int(5) primary key, kinds varchar(15) default Null)`,
              function (error, results, fields) {
                if (error) throw error
                if (room === '104') {
                  if (week == 'Mon') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (3,'class'), (5,'class'), (6,'class'), (7,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Tue') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (3,'class'), (6,'class'), (7,'class'), (8,'class'), (9,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Wed') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (3,'class'), (6,'class'), (7,'class'), (8,'class'), (9,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Thu') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (3,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (5,'class'), (6,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  }
                } else if (room == '105') {
                  if (week == 'Mon') {
                    db.query(
                      `insert into ${name} (time, kinds) values(6,'class'), (7,'class'), (8,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Tue') {
                    db.query(
                      `insert into ${name} (time, kinds) values(6,'class'), (7,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Wed') {
                    db.query(
                      `insert into ${name} (time, kinds) values(3,'class'), (4,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else {
                    res.json({ok: true, body: results})
                  }
                } else if (room == '106') {
                  if (week == 'Mon') {
                    db.query(
                      `insert into ${name} (time, kinds) values(3,'class'), (4,'class'), (6,'class'), (7,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Tue') {
                    db.query(
                      `insert into ${name} (time, kinds) values(6,'class'), (7,'class'), (8,'class'), (9,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Wed') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (6,'class'), (7,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Thu') {
                    db.query(
                      `insert into ${name} (time, kinds) values(5,'class'), (6,'class'), (7,'class'), (8,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else {
                    res.json({ok: true, body: results})
                  }
                } else if (room == '121') {
                  if (week == 'Mon') {
                    db.query(
                      `insert into ${name} (time, kinds) values(5,'class'), (6,'class'), (7,'class'), (8,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Tue') {
                    db.query(
                      `insert into ${name} (time, kinds) values(6,'class'), (7,'class'), (8,'class'), (9,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else if (week == 'Thu') {
                    db.query(
                      `insert into ${name} (time, kinds) values(1,'class'), (2,'class'), (3,'class')`,
                      function (error, results, fields) {
                        if (error) throw error
                        res.json({ok: true, body: results})
                      }
                    )
                  } else {
                    res.json({ok: true, body: results})
                  }
                } else res.json({ok: true, body: results})
              }
            )
          }
        } catch (e) {
          if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
        }
      })
    })
  // .delete('/:id', (req, res) => { 오늘 날짜 이전 데이터 삭제
  //   // select * from infor where day < '0226%';
  //   const {id} = req.params
  //   const sqlQuery = `DELETE FROM infor WHERE day like '${id}% and'`
  //   db.query(sqlQuery, function (error, results, fields) {
  //     try {
  //       if (error) throw error
  //       else {
  //         res.json({ok: true, results})
  //       }
  //     } catch (e) {
  //       if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
  //     }
  //   })
  // })
}
