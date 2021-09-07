import React from 'react'
import { useSelector } from 'react-redux'
import { decrement, increment, set } from './actions'
import { SetCounter } from './SetCounter'
import { useActions } from './use-actions'
import { useCounter } from './use-counter'

export const Counter = () => {
  const incident = 'Incident'
  // const count = useSelector((state) => state.count) // state -> props
  // const dispatch = useDispatch() // dispatch -> props
  const { count, increment, decrement, set } = useCounter()

  return (
    <main className="Counter">
      <h1>Days Since Last {incident}</h1>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={() => increment()}>Increment</button>
        <button onClick={() => set(0)}>Reset</button>
        <button onClick={() => decrement()}>Decrement</button>
      </section>
      <SetCounter />
    </main>
  )
}
