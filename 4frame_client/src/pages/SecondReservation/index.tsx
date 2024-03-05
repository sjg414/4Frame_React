import {SetStateAction, useCallback, useEffect, useState} from 'react'
import SelectPurpose from './SelectPurpose'
import SelectTime from './SelectTime'
import style from './css/SecondReservation.module.css'
import {useNavigate} from 'react-router-dom'
import {useReservation} from '../../contexts'

type SelectFormType = Record<'time' | 'purpose', string>
const initialFormState = {time: '', purpose: ''}

export default function SecondReservation() {
  const [{time, purpose}, setForm] = useState<SelectFormType>(initialFormState)
  const [selectTime, setSelectTime] = useState<string>('') //달력 날짜 상태 관리
  const [selectPurpose, setSelectPurpose] = useState<string>('') //강의실 상태 관리

  const getTime = (newData: SetStateAction<string>) => {
    //calendarCustom에서 선택 날짜 값 받기
    setSelectTime(newData)
    console.log('selectTime', selectTime)
  }
  const getPurpose = (newData: SetStateAction<string>) => {
    //DropDown에서 선택 강의실 값 받기
    setSelectPurpose(newData)
    console.log('SelectPurpose', selectPurpose)
  }

  useEffect(() => {
    const SelectForm = {time: selectTime, purpose: selectPurpose}
    setForm(SelectForm)
  }, [selectTime, selectPurpose])

  const navigate = useNavigate()
  const {selectTimePurpose} = useReservation()
  const selectSecond = useCallback(() => {
    selectTimePurpose(time, purpose, () => navigate('/'))
  }, [time, purpose, navigate, selectTimePurpose])

  return (
    <section className={style.reser}>
      <div className={style.container}>
        <div>
          <SelectTime onGetTime={getTime} />
        </div>
        <div className={style.container}>
          <SelectPurpose onGetPurpose={getPurpose} />
        </div>
        <div>
          <ul className={style.selectData}>
            <li className="mb-3 text-3xl italic font-bold text-orange-600 border-solid">
              선택한 정보
            </li>
            <li>
              <label>시간:</label>
              {selectTime}교시
            </li>
            <li>
              <label>목적:</label>
              {selectPurpose}
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="text-xl text-white btn btn-success"
              onClick={selectSecond}>
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
