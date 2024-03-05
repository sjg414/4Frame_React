import type {ChangeEvent} from 'react'
import {useState, useCallback, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'
import * as U from '../../utils'
import style from './css/LoginPage.module.css'

type LoginFormType = Record<'userNumber' | 'password', string> //id: string, password: sring
const initialFormState = {userNumber: '', password: ''} //초기값

export default function Login() {
  const [{userNumber, password}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    //userNumber or password 입력 시
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  //로그인 시, '/'로 이동
  const navigate = useNavigate()
  const {login} = useAuth()
  const loginAccount = useCallback(() => {
    login(userNumber, password, () => navigate('/'))
  }, [userNumber, password, navigate, login])

  useEffect(() => {
    U.readObjectP<LoginFormType>(userNumber)
      .then(userNumber => {
        if (userNumber) setForm(userNumber)
      })
      .catch(e => {
        /* 오류무시 */
      })
  }, [userNumber])

  return (
    <section className={style.container}>
      <div className={style.login_div}>
        <h4 id={style.login_h4}>SMU 전산관 강의실 예약시스템</h4>
        <div className={style.colorgraph}>
          <hr id={style.login_hr0} />
          <hr id={style.login_hr1} />
          <hr id={style.login_hr2} />
          <hr id={style.login_hr3} />
          <hr id={style.login_hr4} />
          <hr id={style.login_hr5} />
          <hr id={style.login_hr6} />
          <hr id={style.login_hr7} />
          <hr id={style.login_hr8} />
          <hr id={style.login_hr9} />
        </div>
        <div className={style.input_div}>
          <input
            type="text"
            className={style.login_input}
            name="userNumber"
            placeholder="userNumber"
            value={userNumber}
            onChange={changed('userNumber')}
          />
          <input
            type="password"
            className={style.login_input}
            name="password"
            placeholder="Password"
            value={password}
            onChange={changed('password')}
          />
        </div>
        <br />
        {/* <hr id={style.login_hr10} />
        <div className={style.id_save}>
          <input type="checkbox" id="idSaveCheck" className={style.prettyCheckable} />
          <label htmlFor="idSaveCheck">아이디 기억하기</label>
        </div> */}
        <button type="submit" className={style.login_btn} onClick={loginAccount}>
          Login
        </button>
        <div className="mt-6 text-grey-dark">
          Create account?
          <Link className="btn btn-link btn-primary" to="/signup/">
            SignUp
          </Link>
        </div>
      </div>
    </section>
  )
}
