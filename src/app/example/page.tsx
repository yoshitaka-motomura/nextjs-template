'use client'

import { Counter } from './_components/Counter'
import { useCounterStore } from '@/lib/store'

export default function ExamplePage() {
  const { count } = useCounterStore()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">My Template Example</h1>
      <p className="text-lg">This is the about page</p>
      <Counter />
      <p className="text-lg">Count: {count}</p>
    </div>
  )
}
