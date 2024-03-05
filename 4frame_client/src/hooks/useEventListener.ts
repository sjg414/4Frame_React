//이벤트 처리기 커스텀 훅 만들기
import {useEffect} from 'react'

export const useEventListener = (
  target: EventTarget | null,
  type: string,
  callback: EventListenerOrEventListenerObject | null
) => {
  useEffect(() => {
    if (target && callback) {
      //null이 아닐 때 or 값이 바뀔 때(의존성)
      target.addEventListener(type, callback)
      return () => target.removeEventListener(type, callback)
    }
  }, [target, type, callback])
}
