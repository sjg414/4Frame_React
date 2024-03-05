//회원 가입 컴포넌트
import type {ChangeEvent} from 'react'
import {useState, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'
import style from './css/SignUp.module.css'

type SignUpFormType = Record<
  'userName' | 'userNumber' | 'password' | 'confirmPassword' | 'phoneNumber',
  string
>
const initialFormState = {
  userName: '',
  userNumber: '',
  password: '',
  confirmPassword: '',
  phoneNumber: ''
}

export default function SignUp() {
  const [{userName, userNumber, password, confirmPassword, phoneNumber}, setForm] =
    useState<SignUpFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const navigate = useNavigate()
  const {signup} = useAuth()
  const createAccount = useCallback(() => {
    console.log(userName, userNumber, password, confirmPassword, phoneNumber)
    if (password === confirmPassword) {
      signup(userName, userNumber, password, phoneNumber, () => navigate('/'))
    } else alert('password is not equal to confirmPassword')
  }, [userName, userNumber, password, confirmPassword, phoneNumber, navigate, signup])

  return (
    <section className={style.signup}>
      <div className={style.singupForm}>
        <fieldset className={style.join_field}>
          <legend>회원가입양식</legend>
          <ul>
            <li>
              <label htmlFor="useruserName">이름</label>
              <input
                id="userName"
                name="userName"
                type="text"
                placeholder="useruserName"
                value={userName}
                onChange={changed('userName')}
              />
            </li>
            <li>
              <label htmlFor="userNumber">학번</label>
              <input
                id="id"
                name="userNumber"
                type="text"
                placeholder="userNumber"
                value={userNumber}
                onChange={changed('userNumber')}
              />
            </li>
            <li>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={changed('password')}
              />
            </li>
            <li>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={changed('confirmPassword')}
              />
            </li>
            <li>
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="phoneNumber"
                value={phoneNumber}
                onChange={changed('phoneNumber')}
              />
            </li>
          </ul>
          <hr id={style.login_hr10} />
          <div className={style.submit_div}>
            <button type="submit" className="btn btn-info" onClick={createAccount}>
              Create Account
            </button>
          </div>
          <div className="flex items-center justify-center mt-3 text-gray-dark">
            Already have an account?
            <Link className="btn btn-link btn-primary" to="/login/">
              Login
            </Link>
          </div>
        </fieldset>
      </div>
    </section>
  )
}
