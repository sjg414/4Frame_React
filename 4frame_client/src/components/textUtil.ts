//유틸리티 함수 구현하기
//prettier-ignore
export const makeClassName = (
  setting: string,
  _className?: string,
  numberOfLines?: number
) => [setting, numberOfLines ? `line-clamp-${numberOfLines}` : '', _className].join(' ')
