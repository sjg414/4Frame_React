//ListDroppable 컴포넌트로 분리하기
import type {FC} from 'react'
import {useRef} from 'react'
import {useDrop} from 'react-dnd'
import type {DivProps} from './Div'

export type ListDroppableProps = DivProps & {}

export const ListDroppable: FC<ListDroppableProps> = ({...props}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: 'list'
  })
  drop(divRef)
  return <div ref={divRef} {...props} />
}
