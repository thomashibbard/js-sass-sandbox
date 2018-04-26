const path = require('path')
const fs = require('fs-extra')

const mockReq = fs.readFileSync(
  path.resolve(__dirname, '../', '__mocks__', 'req.js')
)
const mockRes = fs.readFileSync(
  path.resolve(__dirname, '../', '__mocks__', 'res.js')
)

const sum = (a, b) => a + b

describe('api server', () => {
  it('should return 200 status', () => {
    expect()
  })
})
