//package.json 파일이 있는 절대 경로 알아내기
import path from 'path'

export const getPublicDirPath = () => path.join(process.cwd(), 'public')
