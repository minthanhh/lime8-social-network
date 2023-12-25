import { SearchSvg } from '../icons'
import { useEffect, useRef, useState } from 'react'
import LoadingSmall from '../Global/SearchLoading'
import { debounce } from 'lodash'
import userService from 'src/services/api/user/user.service'
import useDetectOutsideClick from 'src/hooks/useDetectOUtsideClick'
import { Link } from 'react-router-dom'

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [listUser, setListUser] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchHistories, setSearchHistories] = useState<string[]>([])
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [isActive, setIsActive] = useDetectOutsideClick(popupRef, false)
  const [cachedUsersHistory, setCachedUserHistory] = useState(new Map([]))
  useEffect(() => {
    const searchHistories = localStorage.getItem('searchHistory')

    if (searchHistories) {
      setSearchHistories([...new Set<string>(JSON.parse(searchHistories))])
    }
  }, [])

  const debouncedSearch = useRef(
    debounce(async (searchTerm) => {
      if (searchTerm === '') {
        setListUser([])
        setLoading(false)
      } else {
        const response = await userService.searchUsers(searchTerm)

        const userCacheCopy = new Map(cachedUsersHistory)
        userCacheCopy.set(searchTerm, [...cachedUsersHistory, response.data.search])
        setCachedUserHistory(userCacheCopy)
        setListUser(response.data.search)
        setLoading(false)
      }
    }, 500)
  ).current

  const saveToLocalStorage = (term: string) => {
    const updatedHistories = [...searchHistories, term]
    const unique = new Set(updatedHistories)

    console.log(unique, term)
    localStorage.setItem('searchHistory', JSON.stringify([...unique]))
    setSearchHistories([...unique])
  }

  useEffect(() => {
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  const timeoutRef = useRef<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const newSearch = e.target.value

    setSearchTerm(newSearch)

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      if (newSearch === '') return
      saveToLocalStorage(newSearch)
      setLoading(false)
    }, 1000)

    const matchingKeys = Array.from(cachedUsersHistory.keys()).filter((key: any) => key.includes(searchTerm))
    const matchingUsers = matchingKeys
      .map((key) => cachedUsersHistory.get(key))
      .flat()
      .flat()

    if (matchingUsers.length > 0) {
      setListUser(matchingUsers)
      setLoading(false)
    } else {
      debouncedSearch(newSearch)
    }
  }

  const handleDeleteSearchHistory = (index: number) => {
    const updatedHistory = [...searchHistories]
    updatedHistory.splice(index, 1)
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
    setSearchHistories(updatedHistory)
  }

  return (
    <div ref={popupRef} className={`md:ml-14 ml-32 p-2 flex flex-col relative flex-shrink-0 top-0`}>
      <div
        onFocus={() => setIsActive(true)}
        className='flex md:w-[200px] lg:w-[250px] xl:w-[400px] max-w-full flex-shrink-0 md:gap-2 gap-8 items-center select-none default-animations bg-inputLight dark:bg-inputDark rounded-full relative z-[9999]'
      >
        <span className='md:mx-1 lg:mx-3 cursor-pointer'>
          {loading ? <LoadingSmall /> : <SearchSvg width='24' height='24' />}
        </span>
        <input
          type='text'
          id='search'
          className='outline-none bg-transparent py-1.5 flex flex-1 text-sm dark:text-light'
          placeholder='search explore...'
          onChange={handleChange}
          value={searchTerm}
          autoComplete='off'
        />
      </div>
      {(searchTerm || isActive) && (
        <div
          className={
            isActive
              ? 'absolute left-0 top-0 w-full pt-12 py-2.5 bg-light dark:bg-dark rounded-md shadow-shadowMain px-2.5'
              : ''
          }
        >
          {isActive && searchHistories && !searchTerm && searchHistories.length > 0 && (
            <>
              <div className='py-1.5 pb-3 font-medium text-sm text-dark dark:text-light'>Tìm kiếm gần đây</div>
              {searchHistories.slice(0, 5).map((word, index) => (
                <div
                  key={index}
                  className='relative hover:bg-[#f4f4f4] dark:hover:bg-slate-400/25 cursor-pointer rounded-md flex items-center py-2 px-3'
                >
                  <button
                    onClick={() => {
                      setLoading(true)
                      setSearchTerm(word)

                      if (timeoutRef.current !== null) {
                        clearTimeout(timeoutRef.current)
                      }

                      timeoutRef.current = window.setTimeout(() => {
                        if (word === '') return
                        saveToLocalStorage(word)
                        setLoading(false)
                      }, 1500)

                      const matchingKeys = Array.from(cachedUsersHistory.keys()).filter((key: any) =>
                        key.includes(searchTerm)
                      )
                      const matchingUsers = matchingKeys.map((key) => cachedUsersHistory.get(key)).flat()

                      if (matchingUsers.length > 0) {
                        setListUser(matchingUsers)
                        setLoading(false)
                      } else {
                        debouncedSearch(word)
                      }

                      debouncedSearch(word)
                    }}
                    className='flex items-center gap-5 w-full'
                  >
                    <SearchSvg width='24' height='24' />
                    <div className='text-sm font-medium truncate text-dark dark:text-light'>{word}</div>
                  </button>

                  <button
                    className='ml-auto absolute top-2/4 -translate-y-2/4 right-2.5 z-50 hover:bg-slate-400/25 rounded-full'
                    onClick={() => handleDeleteSearchHistory(index)}
                  >
                    <span className='py-3 px-1.5 text-dark dark:text-light'>&#10006;</span>
                  </button>
                </div>
              ))}
            </>
          )}
          {isActive && searchTerm && listUser.length === 0 && (
            <div className='text-center font-medium text-sm pb-3 py-1.5 text-dark dark:text-light'>
              Không có tìm kiếm nào gần đây
            </div>
          )}
          {searchTerm && isActive && listUser.length > 0 && !loading && (
            <>
              <div className='py-1.5 pb-3 font-medium text-sm text-dark dark:text-light'>Kết quả tìm kiếm</div>
              {listUser.map((user) => (
                <Link
                  key={user._id}
                  to={`/profile/${user._id}`}
                  onClick={() => {
                    setSearchTerm('')
                    setIsActive(false)
                  }}
                >
                  <div className='flex rounded-md items-center py-2 px-4 gap-5 hover:bg-[#f4f4f4] dark:hover:bg-slate-400/25'>
                    <div className='w-[45px] h-[45px]'>
                      <div className='rounded-full overflow-hidden relative pt-[100%]'>
                        <img src={user.profilePicture} className='absolute w-full h-full object-cover inset-0' alt='' />
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <div className='text-sm font-bold text-dark dark:text-light'>{user.username}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
          {isActive && !searchTerm && searchHistories.length === 0 && (
            <div className='text-center font-medium text-sm pb-3 py-1.5 text-dark dark:text-light'>
              Không có lịch sử tìm kiếm nào
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
