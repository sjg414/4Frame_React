//NavigationBar
import {Link as RRLink} from 'react-router-dom'
import {Link} from '../../components'
// import {useAuth} from '../../contexts'
import style from './css/NavigationBar.module.css'
import {useEffect, useState} from 'react'

export default function NavigationBar() {
  // const {loggedUser} = useAuth()
  // const [isLoggedIn, setIsLoggedIn] = useState(loggedUser)

  // useEffect(() => {
  //   console.log('loggedUser1', loggedUser, isLoggedIn)
  //   if (loggedUser) {
  //     setIsLoggedIn(loggedUser)
  //     console.log('loggedUser2', loggedUser, isLoggedIn)
  //   } else {
  //     setIsLoggedIn(undefined)
  //     console.log('loggedUser3', loggedUser, isLoggedIn)
  //   }
  // }, [loggedUser, isLoggedIn])

  const intialLogged = localStorage.getItem('isLoggedIn')
  const [storedLoggedIn, setStoredLoggedIn] = useState(intialLogged)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const localData = localStorage.getItem('isLoggedIn')
    setStoredLoggedIn(localData)

    if (storedLoggedIn === '1') {
      setLoggedIn(true)
    }
  }, [storedLoggedIn])

  return (
    <div className={style.NaviDiv}>
      <div className="flex p-2 navbar">
        <Link to="/" className="text-xl text-white btn btn-link">
          Home
        </Link>
        <Link to="/rest" className="text-xl text-white btn btn-link">
          Rest Test
        </Link>
        {loggedIn && (
          <Link to="/caution" className="text-xl text-white btn btn-link">
            강의실 예약
          </Link>
        )}
        {loggedIn && (
          <Link to="/list" className="text-xl text-white btn btn-link">
            예약 목록
          </Link>
        )}
      </div>
      <div className="flex items-center p-2">
        {!loggedIn && (
          <RRLink to="/login" className="btn btn-sm btn-info">
            Login
          </RRLink>
        )}
        {!loggedIn && (
          <RRLink to="/signup" className="ml-4 btn btn-sm btn-outline btn-accent">
            SignUp
          </RRLink>
        )}
        {loggedIn && (
          <RRLink to="/logout" className="ml-4 mr-4 btn btn-sm btn-info">
            Logout
          </RRLink>
        )}
      </div>
    </div>
  )
}
