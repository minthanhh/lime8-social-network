import { useEffect, useState } from 'react'

const useDetectOutsideClick = (ref: any, initialState: any) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const onClick = (event: any) => {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setIsActive(!isActive)
      }
    }

    if (isActive) {
      window.addEventListener('mousedown', onClick)
    }

    return () => {
      window.removeEventListener('mousedown', onClick)
    }
  }, [isActive, ref])

  return [isActive, setIsActive]
}
export default useDetectOutsideClick
