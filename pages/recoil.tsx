import type { NextPage } from 'next'
import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'

import create from 'zustand'

import { Layout } from '../components/Layout'
import TaskPage from './task/[id]'

const createCountStore = (initialValue: any) =>
  create((set) => ({
    count: initialValue,
    inc: () => set((prev) => ({ count: prev.count + 1 })),
  }))

const useStoreA = createCountStore(1)
const useStoreB = createCountStore(2)
const useStoreC = createCountStore(3)

const CounterA = () => {
  const count = useStoreA((state) => state.count)
  const inc = useStoreA((state) => state.inc)
  return (
    <div>
      A: {count} <button onClick={inc}>+1</button>
    </div>
  )
}

const CounterB = () => {
  const count = useStoreB((state) => state.count)
  const inc = useStoreB((state) => state.inc)
  return (
    <div>
      B: {count} <button onClick={inc}>+1</button>
    </div>
  )
}

const CounterC = () => {
  const count = useStoreC((state) => state.count)
  const inc = useStoreC((state) => state.inc)
  return (
    <div>
      C: {count} <button onClick={inc}>+1</button>
    </div>
  )
}

const App: NextPage = () => {
  return (
    <Layout title="recoil test">
      <ShieldCheckIcon className="mb-6 h-12 w-12 text-blue-500" />
      <CounterA />
      <CounterA />
      <CounterB />
      <CounterB />
      <CounterC />
      <CounterC />
    </Layout>
  )
}

export default App
