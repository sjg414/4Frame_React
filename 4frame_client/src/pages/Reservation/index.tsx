import Dropdown from './dropDown'
import style from './css/Reservation.module.css'
import CalendarCustom from './CalendarCustom'
import {SetStateAction, useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useReservation} from '../../contexts'

type SelectFormType = Record<'name' | 'room' | 'day', string>
const initialFormState = {name: '', room: '', day: ''}

export default function Reservation() {
  const [{name, room, day}, setForm] = useState<SelectFormType>(initialFormState)
  const [selectData, setSelectData] = useState<string>('') //달력 날짜 상태 관리
  const [selectRoom, setSelectRoom] = useState<string>('') //강의실 상태 관리

  const getData = (newData: SetStateAction<string>) => {
    //calendarCustom에서 선택 날짜 값 받기
    setSelectData(newData)
    console.log('selectData', selectData)
  }
  const getRoom = (newData: SetStateAction<string>) => {
    //DropDown에서 선택 강의실 값 받기
    setSelectRoom(newData)
    console.log('selectRoom', selectRoom)
  }

  useEffect(() => {
    const tableName = selectData.concat('_', selectRoom, '_', 'Time')
    const SelectForm = {name: tableName, room: selectRoom, day: selectData}
    setForm(SelectForm)
  }, [selectData, selectRoom])

  const navigate = useNavigate()
  const {selectDayClass} = useReservation()
  const selectFirst = useCallback(() => {
    selectDayClass(name, room, day, () => navigate('/SecondReservation'))
  }, [name, room, day, navigate, selectDayClass])

  return (
    <section className={style.reser}>
      <div className={style.container}>
        <div>
          <CalendarCustom onGetData={getData} />
        </div>
        <div className={style.container}>
          <Dropdown onGetRooom={getRoom} />
        </div>
        <div>
          <ul className={style.selectData}>
            <li className="mb-3 text-3xl italic font-bold text-orange-600 border-solid">
              선택한 정보
            </li>
            <li>
              <label>날짜:</label>
              {selectData}
            </li>
            <li>
              <label>강의실:</label>
              {selectRoom}
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            {/* <Link
              to="/SecondReservation"
              className="text-xl text-white btn btn-success"
              onClick={() => console.log({selectRoom})}>
              선택 완료
            </Link> */}
            <button
              type="submit"
              className="text-xl text-white btn btn-success"
              onClick={selectFirst}>
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
