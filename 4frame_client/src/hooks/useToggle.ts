//useToggle 커스텀 훅 구현하기
import {useState, useCallback} from 'react'

//checked의 기본값 false, 값 변화 시 반대 값으로 토글(ture <=> false)
export const useToggle = (initialChecked: boolean = false): [boolean, () => void] => {
  const [checked, setChecked] = useState<boolean>(initialChecked)
  const toggleChecked = useCallback(() => setChecked(checked => !checked), [])
  return [checked, toggleChecked]
}
