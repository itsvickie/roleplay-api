import test from 'japa'

test.group('A test example', () => {
  test('It should sum', (assert) => {
    assert.equal(2 + 2, 4)
  })
})
