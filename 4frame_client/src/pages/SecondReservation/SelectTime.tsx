import {ChangeEvent, SetStateAction, useEffect, useState} from 'react'
import {get} from '../../server'
import style from './css/SelectTime.module.css'

interface Iprops {
  onGetTime: (newData: SetStateAction<string>) => void
}

export default function SelectTime({onGetTime}: Iprops) {
  const [selectTime, setSelectTime] = useState('') //선택한 시간
  const tableName = localStorage.getItem('tableName')
  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMesage] = useState<string | null>(null)
  // const [getData, setGetData] = useState([{}])

  useEffect(() => {
    console.log('tableName', tableName)
    get(`/selectDayClass/${tableName}`)
      .then(res => res.json())
      .then(body => setData(body))
      .catch(error => setErrorMesage(error.message))
  }, [tableName])

  useEffect(() => {
    const str = JSON.stringify(data, null, 2)
    const regex = /[^0-9]/g
    const timeData = str.replace(regex, '')
    const timeArr = timeData.split('')
    for (let i = 0; i < timeArr.length; i++) {
      // console.log('arr', timeArr[i])
      let tdId = document.getElementById(`td${timeArr[i]}`)
      if (tdId instanceof Element) {
        // console.log('tdId', tdId)
        tdId.style.background = 'red'
        tdId.hidden = true
      }
    }
  }, [data])

  const timeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    //라디오버튼 변경 시 시간 변경
    setSelectTime(e.target.value)
  }

  const transData = () => {
    //데이터 전달
    const newData = selectTime
    onGetTime(newData)
  }

  return (
    <section className={style.TimeSection}>
      <h1 className="mb-8 text-3xl font-bold text-center text-yellow-600">
        3. 시간을 선택하세요.
      </h1>
      <div className={style.timeTable}>
        <table>
          <tbody>
            <tr>
              <td id="td1">
                <input type="radio" name="timebtn" value="1" onChange={timeSelect} />
                1교시(09:30~10:20)
              </td>
            </tr>
            <tr>
              <td id="td2">
                <input type="radio" name="timebtn" value="2" onChange={timeSelect} />
                2교시(10:30~11:20)
              </td>
            </tr>
            <tr>
              <td id="td3">
                <input type="radio" name="timebtn" value="3" onChange={timeSelect} />
                3교시(11:30~12:20)
              </td>
            </tr>
            <tr>
              <td id="td4">
                <input type="radio" name="timebtn" value="4" onChange={timeSelect} />
                4교시(12:30~13:20)
              </td>
            </tr>
            <tr>
              <td id="td5">
                <input type="radio" name="timebtn" value="5" onChange={timeSelect} />
                5교시(13:30~14:20)
              </td>
            </tr>
            <tr>
              <td id="td6">
                <input type="radio" name="timebtn" value="6" onChange={timeSelect} />
                6교시(14:30~15:20)
              </td>
            </tr>
            <tr>
              <td id="td7">
                <input type="radio" name="timebtn" value="7" onChange={timeSelect} />
                7교시(15:30~16:20)
              </td>
            </tr>
            <tr>
              <td id="td8">
                <input type="radio" name="timebtn" value="8" onChange={timeSelect} />
                8교시(16:30~17:20)
              </td>
            </tr>
            <tr>
              <td id="td9">
                <input type="radio" name="timebtn" value="9" onChange={timeSelect} />
                9교시(17:30~18:20)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button className="btn btn-secondary" onClick={transData}>
          선택
        </button>
      </div>
    </section>
  )
}
