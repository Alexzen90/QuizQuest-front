import { useEffect, useState } from "react"
import { TimerProps } from "../../Module/Types/timerType"

export const Timer = ({ onTimeUp, resetKey, isPaused }: TimerProps) => {
  const [count, setCount] = useState(15)

  useEffect(() => {
    setCount(15)
  }, [resetKey])
  
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCount((prev) =>{
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev -1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [resetKey, isPaused, onTimeUp])

  return <p className="text-2xl font-semibold">{count}</p>
}