//GET method로 데이터 가져오기
import {useState, useCallback} from 'react'
import {get} from '../../server'
import {useAuth} from '../../contexts'

export default function GetTest() {
  const {jwt} = useAuth()
  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMesage] = useState<string | null>(null)

  const getAllTest = useCallback(() => {
    get('/selectDayClass')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMesage(error.message))
  }, [])

  const getTest = useCallback(() => {
    get('/selectDayClass/0214_Wed_102_Time', jwt)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMesage(error.message))
  }, [jwt])

  return (
    <div className="mb-4">
      <div className="flex justify-center mb-4">
        <button onClick={getAllTest} className="mr-12 btn btn-primary">
          GET ALL
        </button>
        <button onClick={getTest} className="btn btn-primary">
          GET id 1234
        </button>
      </div>
      <div className="mt-4 text-center">
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  )
}
