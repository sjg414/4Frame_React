//인증 컨텍스트(사용자 정보 저장 추가), signup 함수에 서버 접속 기능 추가, login과 logout 함수 구현
import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback, useEffect} from 'react'
import * as U from '../utils'
import {post} from '../server'

export type LoggedUser = {userNumber: string; password: string}
type Callback = () => void

type ContextType = {
  jwt?: string
  loggedUser?: LoggedUser
  isLoggedIn?: boolean
  signup: (
    userName: string,
    userNumber: string,
    password: string,
    phoneNumber: string,
    callback?: Callback
  ) => void
  login: (userNumber: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (
    userName: string,
    userNumber: string,
    password: string,
    phoneNumber: string,
    callback?: Callback
  ) => {},
  login: (userNumber: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jwt, setJwt] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const signup = useCallback(
    (
      userName: string,
      userNumber: string,
      password: string,
      phoneNumber: string,
      callback?: Callback
    ) => {
      const user = {userName, userNumber, password, phoneNumber}

      post('/auth/signup', user)
        .then(res => res.json())
        .then((result: {ok: boolean; body?: string; errorMessage?: string}) => {
          const {ok, body, errorMessage} = result
          if (ok) {
            U.writeStringP('jwt', body ?? '').finally(() => {
              setJwt(body ?? '')
              setLoggedUser(notUsed => user)
              localStorage.setItem('isLoggedIn', '1')
              U.writeStringP('user', user.userNumber).finally(
                () => callback && callback()
              )
            })
          } else setErrorMessage(errorMessage ?? '')
        })
        .catch((e: Error) => setErrorMessage(e.message))
    },
    []
  )

  const login = useCallback(
    (userNumber: string, password: string, callback?: Callback) => {
      const user = {userNumber, password}
      // U.readStringP(''.concat('jwt', userNumber))
      //   .then(jwt => {
      //     setJwt(jwt ?? '')
      //     console.log(''.concat('jwt', userNumber))
      //     return post('/auth/login', user, jwt)
      //   })
      //   .then(res => res.json())
      //   .then((result: {ok: boolean; errorMessage?: string}) => {
      //     if (result.ok) {
      //       setLoggedUser(notUsed => user)
      //       localStorage.setItem('isLoggedIn', '1')
      //       callback && callback()
      //     } else {
      //       setErrorMessage(result.errorMessage ?? '')
      //     }
      //   })
      post('/auth/login', user)
        .then(res => res.json())
        .then((result: {ok: boolean; body?: string; errorMessage?: string}) => {
          const {ok, body, errorMessage} = result
          if (ok) {
            U.writeStringP('jwt', body ?? '').finally(() => {
              setJwt(body ?? '')
              setLoggedUser(notUsed => user)
              localStorage.setItem('isLoggedIn', '1')
              U.writeStringP('user', user.userNumber).finally(
                () => callback && callback()
              )
            })
          } else setErrorMessage(errorMessage ?? '')
        })
        .catch((e: Error) => setErrorMessage(e.message ?? ''))
    },
    []
  )

  const logout = useCallback((callback?: Callback) => {
    localStorage.removeItem(''.concat('jwt'))
    setJwt(notUsed => '')
    setLoggedUser(undefined)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    callback && callback()
  }, [])

  // useEffect(() => {
  //   const storedLoggedIn = localStorage.getItem('isLoggedIn')
  //   if (storedLoggedIn === '1') {
  //     setIsLoggedIn(true)
  //   }
  // }, [isLoggedIn])

  useEffect(() => {
    const deleteToken = false //localStorage의 jwt값을 초기화 할 때 사용
    if (deleteToken) {
      U.writeStringP('jwt', '')
        .then(() => {})
        .catch(() => {})
    } else {
      U.readStringP('jwt')
        .then(jwt => setJwt(jwt ?? ''))
        .catch(() => {
          /* 오류 무시 */
        })
    }
  }, [])

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage)
      setErrorMessage(notUsed => '')
    }
  }, [errorMessage])

  const value = {
    jwt,
    errorMessage,

    isLoggedIn,
    loggedUser,
    signup,
    login,
    logout
  }
  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
