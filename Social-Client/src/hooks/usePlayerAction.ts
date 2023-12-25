import { useCallback, useEffect, useRef, useState } from 'react'

export const usePlayerAction = () => {
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [play, setPlay] = useState(true)
  const [progress, setProgress] = useState(0)

  const handleToggleMuted = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.muted = !muted
      setMuted(!muted)
    }
  }, [muted])

  const handleTogglePlay = useCallback(() => {
    if (playerRef.current) {
      if (play) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
      setPlay(!play)
    }
  }, [play])

  const handleTimeUpdate = () => {
    if (playerRef.current) {
      const duration = playerRef.current.duration
      const currentTime = playerRef.current.currentTime
      const progress = (currentTime / duration) * 100
      setProgress(progress)
    }
  }

  useEffect(() => {
    const currentPlayer = playerRef.current
    if (play) {
      currentPlayer?.addEventListener('timeupdate', handleTimeUpdate)
    }
    return () => currentPlayer?.removeEventListener('timeupdate', handleTimeUpdate)
  }, [play])

  return {
    ref: playerRef,
    play,
    muted,
    handleTimeUpdate,
    toggleMuted: handleToggleMuted,
    togglePlay: handleTogglePlay,
    progress
  }
}
