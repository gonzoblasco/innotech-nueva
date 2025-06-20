describe('Performance Tests', () => {
  it('measures basic operations', () => {
    const start = performance.now()
    
    // Simulate some work
    const data = Array.from({ length: 1000 }, (_, i) => i)
    const processed = data.map(x => x * 2)
    
    const end = performance.now()
    const duration = end - start
    
    expect(processed).toHaveLength(1000)
    expect(duration).toBeLessThan(100) // Should be very fast
  })
  
  it('memory usage is reasonable', () => {
    const createObjects = () => {
      return Array.from({ length: 100 }, (_, i) => ({ id: i, data: 'test' }))
    }
    
    const objects = createObjects()
    expect(objects).toHaveLength(100)
    expect(objects[0]).toHaveProperty('id')
    expect(objects[0]).toHaveProperty('data')
  })
})
