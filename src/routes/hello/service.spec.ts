import {hello} from './service'
import {makeChance} from '../../lib/chance'

describe('hello', () => {
  it('returns a helloing to stranger when no argument is given', () => {
    const res = hello()
    expect(res).toEqual('hello world')
  })
})
