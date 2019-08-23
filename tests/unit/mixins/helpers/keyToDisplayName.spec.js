import keyToDisplayName from '@/mixins/helpers/keyToDisplayName.js'

describe('keyToDisplayName', () => {
  it('should work', async () => {
    // Arrange
    const expected = 'Ik Ben Pietje'
    // Act
    const result = keyToDisplayName('ik_ben_pietje')
    // Assert
    expect(result).toBe(expected)
  })
})
