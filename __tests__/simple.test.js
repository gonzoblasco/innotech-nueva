// __tests__/simple.test.js - SIN IMPORTS
describe('Jest setup', () => {
  test('should work', () => {
    expect(1 + 1).toBe(2)
  })

  test('should handle basic JS', () => {
    const obj = { type: 'div', children: 'Hello' }
    expect(obj.type).toBe('div')
  })

  test('should handle arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
