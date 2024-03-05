//라우터 설정
import {Express} from 'express'
import * as R from '../routers'

export const setupRouters = (app: Express, ...args: any[]): Express => {
  //prettier-ignore
  return app
    .use('/test', R.testRouter(...args))
    .use('/auth', R.authRouter(...args))
    .use('/selectDayClass', R.selectDayClassRouter(...args))
    .use('/selectTimePurpose', R.selectTimePurposeRouter(...args))
    .use('/reservationList', R.reservationListRouter(...args))
}
