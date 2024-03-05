import {ChangeEvent, SetStateAction} from 'react'
import {useState} from 'react'
import style from './css/DropDown.module.css'

interface Iprops {
  onGetRooom: (newData: SetStateAction<string>) => void
}

export default function Dropdown({onGetRooom}: Iprops) {
  const [classSelected, setClassSelected] = useState('강의실 선택')
  const [roomSelected, setRoomSelected] = useState('호실 선택')

  const classSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setClassSelected(e.target.value)
    console.log('selected: ', classSelected)
  }
  const roomSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoomSelected(e.target.value)
    console.log('selected: ', roomSelected)
    const newData = roomSelected
    onGetRooom(newData)
  }

  const transData = () => {
    const newData = roomSelected
    onGetRooom(newData)
  }

  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold text-center text-yellow-600">
        2. 강의실을 선택하세요.
      </h1>
      <div className="flex justify-center">
        <div>
          <select className={style.drop} onChange={classSelect} value={classSelected}>
            <option value={'default'}>강의실 선택</option>
            <option value={'normal'}>일반 강의실</option>
            <option value={'computer'}>컴퓨터 강의실</option>
          </select>
        </div>
        <div>
          {classSelected === '강의실 선택' && <select className={style.drop}></select>}
          {classSelected === 'normal' && (
            <select className={style.drop} onChange={roomSelect} value={roomSelected}>
              <option value={'default'}>호실 선택</option>
              <option value={'102'}>102호</option>
              <option value={'104'}>104호</option>
              <option value={'108'}>108호</option>
            </select>
          )}
          {classSelected === 'computer' && (
            <select className={style.drop} onChange={roomSelect} value={roomSelected}>
              <option value={'default'}>호실 선택</option>
              <option value={'105'}>105호</option>
              <option value={'106'}>106호</option>
              <option value={'121'}>121호</option>
            </select>
          )}
        </div>
      </div>
      <div className={style.imgContainer}>
        {roomSelected === '호실 선택' && <img src="images/img12.jpg" alt="강의실 사진" />}
        {roomSelected === '102' && <img src="images/102호.jpg" alt="강의실 사진" />}
        {roomSelected === '104' && <img src="images/104호.jpg" alt="강의실 사진" />}
        {roomSelected === '108' && <img src="images/108호.jpg" alt="강의실 사진" />}
        {roomSelected === '105' && <img src="images/105호.jpg" alt="강의실 사진" />}
        {roomSelected === '106' && <img src="images/106호.jpg" alt="강의실 사진" />}
        {roomSelected === '121' && <img src="images/121호.jpg" alt="강의실 사진" />}
      </div>
      <div className="flex justify-center">
        <button className="btn btn-secondary" onClick={transData}>
          선택
        </button>
      </div>
    </section>
  )
}
