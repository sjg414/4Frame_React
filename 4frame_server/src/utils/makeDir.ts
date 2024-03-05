//directory 생성
import fs from 'fs'

export const makeDir = (dirName: string) => {
  if (false == fs.existsSync(dirName))
    //dirName directory가 없을 경우 생성
    fs.mkdirSync(dirName)
}
