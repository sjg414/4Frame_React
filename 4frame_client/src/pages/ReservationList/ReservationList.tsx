import {useEffect, useState} from 'react'
import style from './css/ReservationList.module.css'
import {get} from '../../server'

export default function ReservationList() {
  const userNumber = localStorage.getItem('user')
  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMesage] = useState<string | null>(null)

  useEffect(() => {
    console.log('userNumber', userNumber)
    get(`/reservationList/${userNumber}`)
      .then(res => res.json())
      .then(body => setData(body))
      .catch(error => setErrorMesage(error.message))
  }, [userNumber])

  useEffect(() => {
    const str = JSON.stringify(data, null, 2)
    console.log('str', str)
  }, [data])

  return (
    <section className={style.ListSection}>
      <div>hello</div>
    </section>
  )
}
