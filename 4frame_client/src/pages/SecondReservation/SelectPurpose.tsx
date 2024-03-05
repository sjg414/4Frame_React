import {ChangeEvent, SetStateAction, useState} from 'react'
import style from './css/SelectPurpose.module.css'

interface Iprops {
  onGetPurpose: (newData: SetStateAction<string>) => void
}

export default function SelectPurpose({onGetPurpose}: Iprops) {
  const [purposeSelect, setPurposeSelect] = useState('') //선택한 시간

  const pusrposeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    //라디오버튼 변경 시 시간 변경
    setPurposeSelect(e.target.value)
  }

  const transData = () => {
    //데이터 전달
    const newData = purposeSelect
    onGetPurpose(newData)
  }
  return (
    <section className={style.PurposeSection}>
      <h1 className="mb-8 text-3xl font-bold text-center text-yellow-600">
        4. 목적을 선택하세요.
      </h1>
      <div className={style.purposeTable}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="radio"
                  name="selectPurpose"
                  value="공부"
                  onChange={pusrposeSelect}
                />
                공부
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="selectPurpose"
                  value="과제"
                  onChange={pusrposeSelect}
                />
                과제
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="selectPurpose"
                  value="조별모임발표준비"
                  onChange={pusrposeSelect}
                />
                조별모임 및 발표준비
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
