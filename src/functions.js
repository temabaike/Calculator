export function calculate(result) {
  let i
  let symArr = ['+', '-', '*', '/']
  for (i = 0; i < symArr.length; i++) {
    if (result.indexOf(symArr[i]) > -1) {
      break
    }
  }

  let leftPart = Number(result.slice(0, result.indexOf(symArr[i])))
  let rightPart = Number(result.slice(result.indexOf(symArr[i]) + 1))

  if (symArr[i] === '+') {
    return leftPart + rightPart
  } else if (symArr[i] === '-') {
    return leftPart - rightPart
  } else if (symArr[i] === '*') {
    return leftPart * rightPart
  } else if (symArr[i] === '/') {
    return leftPart / rightPart
  }
}







