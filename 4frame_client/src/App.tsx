import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './contexts'
import {ReservationProvider} from './contexts'
import RoutesSetup from './routes/RoutesSetup'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReservationProvider>
          <RoutesSetup />
        </ReservationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
