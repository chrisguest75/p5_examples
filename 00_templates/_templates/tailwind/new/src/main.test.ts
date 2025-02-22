---
to: <%= name %>/src/main.test.ts
---
import { expect, test } from 'vitest'

test('Simple test', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(0).not.toStrictEqual(1);
})

