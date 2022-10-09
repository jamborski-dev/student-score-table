export const sleep = (delay: number) => new Promise(resolve => setTimeout(() => resolve, delay))

export const formatScoreCell = (value: number) => (value < 30 ? "-low" : value > 85 ? "-high" : "")

export const uniqueFromArr = (arr: any[]) =>
  arr.filter((value, currentIndex, thisArr) => thisArr.indexOf(value) === currentIndex)
