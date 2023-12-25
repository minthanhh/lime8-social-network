import { useCallback, useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const query = window.matchMedia('(prefers-color-scheme: dark)')

  const onWindowMatch = () => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && query.matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const chooseTheme = theme === 'light' ? true : false

  onWindowMatch()

  useEffect(() => {
    switch (theme) {
      case 'dark':
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break
      case 'light':
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        break
      default:
        localStorage.removeItem('theme')
        break
    }
  }, [theme])

  const handleToggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  return { chooseTheme, theme, toggleTheme: handleToggleTheme }
}
