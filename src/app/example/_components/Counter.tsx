'use client'
// This code is a sample. Feel free to edit or delete it.
import { useCounterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export const Counter = () => {
  const { increment, decrement } = useCounterStore()

  return (
    <section className="min-w-6/12 mx-auto my-3.5">
      <p className="font-semibold text-gray-400">Counter Component</p>
      <div className="flex items-center justify-center gap-4 border-1 border-gray-300 rounded-md p-4">
        <Button onClick={increment} className="bg-blue-500 hover:bg-blue-600">
          Increment
        </Button>
        <Button onClick={decrement} className="bg-red-500 hover:bg-red-600">
          Decrement
        </Button>
      </div>
    </section>
  )
}
