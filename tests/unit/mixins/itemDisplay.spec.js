import mixin from '@/mixins/itemDisplay.js'

describe('keyToDisplayName', () => {
  it('should work', async () => {
    // Arrange
    const expected = 'Ik Ben Pietje'
    // Act
    const result = mixin.methods.keyToDisplayName('ik_ben_pietje')
    // Assert
    expect(result).toBe(expected)
  })
})
