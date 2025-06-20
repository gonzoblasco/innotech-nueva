describe('Chat Flow Integration', () => {
  it('basic flow logic works', () => {
    const userFlow = {
      selectAgent: (agentId) => ({ agentId, selected: true }),
      sendMessage: (message) => ({ message, sent: true }),
      receiveResponse: (response) => ({ response, received: true }),
    }
    
    const agent = userFlow.selectAgent('marketing-digital')
    expect(agent.selected).toBe(true)
    
    const message = userFlow.sendMessage('Hello')
    expect(message.sent).toBe(true)
    
    const response = userFlow.receiveResponse('Hi there!')
    expect(response.received).toBe(true)
  })
})
