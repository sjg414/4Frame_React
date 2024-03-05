//라우터 구현, 로그인 라우터 구현
import {Router} from 'express'
import * as U from '../utils'
import mysql from 'mysql'

export const authRouter = (...args: any[]) => {
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
    .post('/signUp', async (req, res) => {
      try {
        const {userName, userNumber, password, phoneNumber} = req.body
        const hashed = await U.hashPasswordP(password)
        const newBody = {userName, userNumber, password: hashed, phoneNumber}
        const jwt = await U.jwtSignP(userNumber)
        const sqlQuery = `SELECT * FROM member where userNumber='${userNumber}'`

        db.query(sqlQuery, function (error, results, fields) {
          if (error) throw error
          if (results.length > 0) {
            res.json({ok: false, errorMessage: '이미 가입한 회원입니다.'})
          }
        })
        db.query(`insert into member set ?`, newBody, function (error, results, fields) {
          if (error) throw error
          console.log('hashed', hashed)
          console.log('newBody', newBody)
          console.log('jwt', jwt)
          console.log('results', results)
          res.json({ok: true, body: jwt})
        })
      } catch (e) {
        if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
      }
    })

    .post('/login', async (req, res) => {
      // const {authorization} = req.headers || {}
      // if (!authorization) {
      //   res.json({ok: false, errorMessage: 'JSON 토큰이 없습니다.'})
      //   return
      // }
      try {
        // const tmp = authorization.split(' ')
        // if (tmp.length != 2)
        //   res.json({ok: false, errorMessage: '헤더에서 JSON 토큰을 얻을 수 없습니다.'})
        // else {
        //   const jwt = tmp[1]
        //   const decoded = (await U.jwtVerifyP(jwt)) as unknown as {userNumber: string}
        //   const {userNumber} = req.body
        //   const sqlQuery = `SELECT * FROM member where userNumber='${userNumber}'`
        //   db.query(sqlQuery, async function (error, results, fields) {
        //     if (error) {
        //       console.log('decoded', decoded)
        //       console.log('results1', results)
        //       console.log('error1', error)
        //       res.json({ok: false, errorMessage: '등록되지 않은 사용자 입니다.'})
        //       return
        //     }
        //     const {userNumber, password} = req.body
        //     if (userNumber !== results[0].userNumber) {
        //       console.log('userNumber', userNumber)
        //       console.log('userNumber', results[0].userNumber)
        //       res.json({ok: false, errorMessage: '이메일 주소가 틀립니다.'})
        //       return
        //     }
        //     const same = await U.comparePasswordP(password, results[0].password)
        //     if (false == same) {
        //       console.log('same', same)
        //       console.log(password)
        //       console.log(results[0].password)
        //       res.json({ok: false, errorMessage: '비밀번호가 틀립니다.'})
        //       return
        //     }

        //     res.json({ok: true})
        //   })
        // }
        const {userNumber, password} = req.body
        const jwt = await U.jwtSignP(userNumber)
        const sqlQuery = `SELECT * FROM member where userNumber='${userNumber}'`
        db.query(sqlQuery, async function (error, results, fields) {
          if (error) {
            console.log('results1', results)
            console.log('error1', error)
            res.json({ok: false, errorMessage: '등록되지 않은 사용자 입니다.'})
            return
          }
          if (userNumber !== results[0].userNumber) {
            console.log('userNumber', userNumber)
            console.log('userNumber', results[0].userNumber)
            res.json({ok: false, errorMessage: '이메일 주소가 틀립니다.'})
            return
          }
          const same = await U.comparePasswordP(password, results[0].password)
          if (false == same) {
            console.log('same', same)
            console.log(password)
            console.log(results[0].password)
            res.json({ok: false, errorMessage: '비밀번호가 틀립니다.'})
            return
          }

          res.json({ok: true, body: jwt})
        })
      } catch (e) {
        if (e instanceof Error) {
          res.json({ok: false, errorMessage: e.message})
        }
      }
    })
  //   const {body} = req
  //   const {userNumber} = req.body
  //   const {password} = req.body
  //   const sqlQuery = `SELECT * FROM member where userNumber=${userNumber}`
  //   db.query(sqlQuery, function (error, results, fields) {
  //     try {
  //       if (results.length > 0) {
  //         if (results[0].password !== password) {
  //           console.log(results[0].password, password)
  //           res.json({ok: false, errorMessage: '비밀번호가 틀립니다.'})
  //         } else {
  //           console.log('id, password', {userNumber}, {password}, {body})
  //           console.log(results, body)
  //           res.json({ok: true, body})
  //         }
  //       } else {
  //         console.log('id, password', {userNumber}, {password}, {body})
  //         console.log(results)
  //         res.json({ok: false, errorMessage: '아이디가 틀립니다.'})
  //       }
  //     } catch (e) {
  //       console.log(results, body)
  //       if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
  //     }
  //   })
  // })
}
