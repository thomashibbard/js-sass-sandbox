const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1')
    }, 1000)
  })
}
const p2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve({ data: { fname: 'thomas' }, otherData: [1, 2, 3, 4] })
      reject(new Error('something horribly misguided'))
    }, 100)
  })
}

const f1 = async () => {
  /*  const { otherData } = await p2().catch(error => {
    throw new Error('something horrid', error)
  })*/
  try {
    const { otherData } = await p2()
    const arr = otherData.map(n => n * 2)
    console.log(arr)
  } catch (err) {
    console.error('BAD', err)
  }
}

f1()

console.log('post f1')
