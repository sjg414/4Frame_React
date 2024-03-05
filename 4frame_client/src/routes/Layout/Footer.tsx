//Footer
import {Link} from '../../components'
import style from './css/Footer.module.css'

export default function Footer() {
  return (
    <footer className={style.footerStyle}>
      <div>
        <Link to="http://semyung.ac.kr" className="text-xl text-white btn btn-link">
          세명대학교 바로가기
        </Link>
        <p className="text-blue-400 text-l">Copyrigt 2024 - All right reserved by Song</p>
      </div>
    </footer>
  )
}
