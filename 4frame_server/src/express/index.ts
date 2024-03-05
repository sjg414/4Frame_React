//express() code 분리, 로깅 미들웨어 추가, 파일 서버 기능 추가, express.json과 cors 미들웨어 추가
import express from 'express'
import cors from 'cors'
import {setupRouters} from './setupRouters'

export const createExpressApp = (...args: any[]) => {
  const app = express()
  app
    .use((req, res, next) => {
      console.log(`url='${req.url}, method=${req.method}`)
      next()
    })
    .use(express.static('public')) //public 디렉터리에 있는 .html .css .js .png와 같은 파일을 웹에서 응답할 수 있게 함
    .use(express.json()) //전달받은 데이터를 req.body 형태로 얻을 수 있도록 함
    .use(cors()) //preflight(악의적인 데이터 서버에 보내지 못하게 함)
    .get('/', (req, res) => {
      res.json({message: 'Hello express World!'})
    })

  return setupRouters(app, ...args)
}
