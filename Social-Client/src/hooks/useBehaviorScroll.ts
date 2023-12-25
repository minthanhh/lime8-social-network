import { useEffect, useRef } from 'react'

const useBehaviorScroll = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [])

  return { ref }
}

export default useBehaviorScroll
