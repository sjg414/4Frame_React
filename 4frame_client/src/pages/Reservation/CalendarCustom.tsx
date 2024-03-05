import moment from 'moment'
import {SetStateAction, useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import style from './css/CalendarCustom.module.css'

interface Iprops {
  onGetData: (newData: SetStateAction<string>) => void
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarCustom({onGetData}: Iprops) {
  const [value, onChange] = useState<Value>(new Date())
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [getWeek, setGetWeek] = useState('')

  // useEffect(() => {

  //   setGetWeek(setWeek)
  // }, [setGetWeek])

  const transData = () => {
    const setWeek = week[moment(value?.toString()).day()]
    const newData = moment(value?.toString()).format('MMDD').concat('_', setWeek)
    onGetData(newData)
  }

  return (
    <section>
      <div>
        <h1 className="mb-8 text-3xl font-bold text-center text-yellow-600">
          1. 날짜를 선택하세요.
        </h1>
        <Calendar
          className={style.calendar}
          minDate={new Date()} //오늘 날짜부터 선택가능
          maxDate={new Date(moment().add(14, 'days').format('YYYY-MM-DD'))} //오늘 날짜로 부터 2주 뒤 까지 가능
          calendarType="gregory" //일요일부터 시작
          onChange={onChange} //날짜 변경 시
          // onClickDay={transData} //날짜 클릭 시
          formatDay={(locale, date) => moment(date).format('DD')} //'일' 없애기
          value={value}
        />
      </div>
      <div className={style.select}>
        <p>선택한 날짜 : </p>
        {/* {moment(value?.toString()).format('MM월 DD일')} */}
        {getWeek}
      </div>
      <div className="flex justify-center mt-4">
        <button className="btn btn-secondary" onClick={transData}>
          선택
        </button>
      </div>
    </section>
  )
}
