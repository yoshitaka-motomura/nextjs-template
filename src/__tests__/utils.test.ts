import { cn } from '@/lib/utils'

describe('cn', () => {
  test('merges class names and removes falsy values', () => {
    const result = cn(
      'p-2',
      null as unknown as string,
      undefined as unknown as string,
      false as unknown as string,
      'text-red-500',
    )
    expect(result).toBe('p-2 text-red-500')
  })

  test('tailwind-merge resolves conflicting utilities (last wins)', () => {
    const result = cn('p-2', 'p-4', 'text-red-500', 'text-blue-500')
    expect(result).toBe('p-4 text-blue-500')
  })

  test('supports conditional class names', () => {
    const isActive = true
    const result = cn('btn', isActive && 'btn-active')
    expect(result).toBe('btn btn-active')
  })
})
