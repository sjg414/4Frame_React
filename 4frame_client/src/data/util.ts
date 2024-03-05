// 가짜 데이터를 만드는 함수 정의하기
export const makeArray = (length: number) => new Array(length).fill(null) //Array 생성 함수
export const range = (min: number, max: number): number[] =>
  makeArray(max - min).map((notUsed, index) => index + min) //range 함수
export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min //min ~ max 무작위 정수 반환
