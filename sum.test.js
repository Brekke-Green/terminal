import { sum } from './sum.js'
import { test, expect } from 'vitest'

test("validate test setup", () => {
    expect(sum(1,1)).toEqual(2)
})
