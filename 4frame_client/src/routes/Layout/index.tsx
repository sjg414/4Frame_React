//인덱스에 Outlet 추가하기(RouteSetup.tsx에서 설정한 라우트 경로의 컴포넌트가 여기에 위치하게 함)
import {Outlet} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  )
}
