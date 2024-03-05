import style from './css/Landing.module.css'

export default function Landing() {
  return (
    <section className="mt-4">
      <div>
        <h1 className={style.imgh1}>SMU 전산관 강의실 예약시스템</h1>
      </div>
      <div className={style.imageContainer}>
        <img className={style.smuImage} src="images/img12.jpg" alt="smuLogo" />
      </div>
    </section>
  )
}
