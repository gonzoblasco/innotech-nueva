// __tests__/basic.test.js - TEST SÚPER BÁSICO
describe('Basic tests', () => {
  test('Math works', () => {
    expect(2 + 2).toBe(4)
  })

  test('Arrays work', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
