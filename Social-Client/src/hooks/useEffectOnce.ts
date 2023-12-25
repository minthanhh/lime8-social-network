import { useRef, useEffect } from 'react'

const useEffectOnce = (callback: () => void): void => {
  const calledOnce = useRef(false)

  useEffect(() => {
    if (!calledOnce.current) {
      callback()
      calledOnce.current = true
    }
  }, [callback])
}

export default useEffectOnce
