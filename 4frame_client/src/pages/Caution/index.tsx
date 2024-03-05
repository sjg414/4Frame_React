import style from '../css/Caution.module.css'
import {Title} from '../../components'
import {Link} from '../../components'

export default function Caution() {
  return (
    <section className={style.Caution}>
      <div className={style.container}>
        <div>
          <Title className="p-3 text-white bg-red-400">학생 주의 사항</Title>
          <ol>
            <li>
              신청서의 사용목적과 실제 내용이 상이할 경우 승인을 취소할 수 있으며,
              이용기간 및 일일 이용시간을 준수해 주시기 바랍니다.
            </li>
            <li>
              승인 후 학교행사 등 불가피한 사정으로 해당 강의실을 대학이 사용해야 할 경우
              학교에 우선권이 있으며, 사전통보 후 승인을 취소할 수 있습니다.
            </li>
            <li>
              신청내용을 이행하지 아니하거나 학교측의 정당한 요청사항을 거부할 경우에는
              사용 중이라도 그 승인을 취소할 수 있습니다.
            </li>
            <li>
              이용자는 본 강의실 이용시 원래의 상태를 보전하고 시설이 손상되지 않도록
              최선을 다해야 합니다.
            </li>
            <li>
              강의실을 청결하게 사용해야 합니다. 다음 인원이 사용할 수 있도록 깨끗하게
              정리합니다.
            </li>
          </ol>
        </div>
        <div className={style.btnStyle}>
          <Link to="/Reservation" className="text-xl text-white btn btn-success">
            예약신청하기
          </Link>
        </div>
      </div>
    </section>
  )
}
