import {createServer} from 'http'
import {getPublicDirPath} from './config'
import {makeDir} from './utils'
// import type {MongoDB} from './mongodb'
// import {connectAndUseDB} from './mongodb'
import mysql from 'mysql'

import {createExpressApp} from './express'

makeDir(getPublicDirPath()) //public directory 생성

const port = 4000
const hostname = 'localhost'

const DB = mysql.createConnection({
  host: hostname, // 호스트
  user: 'root', // 데이터베이스 계정
  password: 'secret', // 데이터베이스 비밀번호
  database: 'member_db' // 사용할 데이터베이스
})
DB.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + DB.threadId)
})
createServer(createExpressApp(DB)).listen(port, () =>
  console.log(`connect http://${hostname}:${port}`)
)

// connectAndUseDB(connectCallback, 'ch07')

/*   HTTP web server 만들기
createServer((req, res) => {
  console.log('req.url', req.url)
  console.log('req.method', req.method)
  console.log('req.headers', req.headers)
  res.write('Hello World!')
  res.end()
}).listen(port, () => console.log(`connect http://${hostname}:${port}`))*/
