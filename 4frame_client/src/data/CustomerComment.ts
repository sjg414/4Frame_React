//고객 평가 데이터 만들기
import * as C from './chance'
import * as I from './image'

export type CustomerComment = {
  uuid: string
  name: string
  jobTitle: string
  company: string
  avatar: string
  comment: string
}

export const makeCustomerComment = (
  uuid: string,
  name: string,
  jobTitle: string,
  company: string,
  avatar: string,
  comment: string
): CustomerComment => ({uuid, name, jobTitle, company, comment, avatar})

export const makeRandomCustomerComment = () =>
  makeCustomerComment(
    C.randomUUID(),
    C.randomName(),
    C.randomJobTitle(),
    C.randomCompanyName(),
    I.randomAvatar(),
    C.randomParagraphs(1)
  )
