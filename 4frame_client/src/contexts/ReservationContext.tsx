import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback, useEffect} from 'react'
import {post, del} from '../server'

export type FirstTable = {name: string; room: string; day: string}
export type SecondTable = {time: string; purpose: string}
type Callback = () => void

type ContextType = {
  FirstTable?: FirstTable
  tableName?: string | null
  selectDayClass: (name: string, room: string, day: string, callback?: Callback) => void
  selectTimePurpose: (time: string, kinds: string, callback?: Callback) => void
}

export const ReservationContext = createContext<ContextType>({
  selectDayClass: (name: string, room: string, day: string, callback?: Callback) => {},
  selectTimePurpose: (time: string, kinds: string, callback?: Callback) => {}
})

type ReservationProviderProps = {}

export const ReservationProvider: FC<PropsWithChildren<ReservationProviderProps>> = ({
  children
}) => {
  const initialTableName = localStorage.getItem('tableName')
  const [tableName, setTableName] = useState<string | null>(initialTableName)
  const [firstTable, setFirstTable] = useState<FirstTable | undefined>(undefined)
  const [secondTable, setSecondTable] = useState<SecondTable | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const selectDayClass = useCallback(
    (name: string, room: string, day: string, callback?: Callback) => {
      const selection = {name, room, day}

      post('/selectDayClass', selection)
        .then(res => res.json())
        .then((result: {ok: boolean; body?: string; errorMessage?: string}) => {
          const {ok, errorMessage} = result
          if (ok) {
            setFirstTable(notUsed => selection)
            setTableName(selection.name)
            localStorage.setItem('tableName', selection.name)
            callback && callback()
          } else setErrorMessage(errorMessage ?? '')
        })
        .catch((e: Error) => setErrorMessage(e.message))
    },
    []
  )

  const selectTimePurpose = useCallback(
    (time: string, purpose: string, callback?: Callback) => {
      const selection = {time, purpose}
      const userNumber = localStorage.getItem('user')
      const newBody = {time, purpose, userNumber, tableName}

      post('/selectTimePurpose', newBody)
        .then(res => res.json())
        .then((result: {ok: boolean; body?: string; errorMessage?: string}) => {
          const {ok, errorMessage} = result
          if (ok) {
            setSecondTable(notUsed => selection)
            callback && callback()
          } else setErrorMessage(errorMessage ?? '')
        })
        .catch((e: Error) => setErrorMessage(e.message))
    },
    [tableName]
  )

  // useEffect(() => { 오늘 날짜 이전 데이터 삭제
  //   const date = new Date()
  //   const mm = `${('0' + (date.getMonth() + 1)).slice(-2)}`
  //   const dd = `${('0' + date.getDate()).slice(-2)}`
  //   const current = mm + dd
  //   console.log('date', current)
  //   del(`/selectDayClass/${current}`)
  //     .then(res => res.json())
  //     .catch(error => setErrorMessage(error.message))
  // }, [])

  const value = {
    errorMessage,
    tableName,
    firstTable,
    selectDayClass,
    selectTimePurpose
  }
  return <ReservationContext.Provider value={value} children={children} />
}

export const useReservation = () => {
  return useContext(ReservationContext)
}
