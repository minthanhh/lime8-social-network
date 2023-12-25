/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, User } from 'src/components'
import { useAppSelector } from 'src/hooks/useRedux'

interface SearchListProps {
  result: any[]
  isSearching: boolean
  searchTerm: string
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>
  setSearch: (term: string) => void
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
  setSearchResult: React.Dispatch<React.SetStateAction<any>>
  setComponentType: (type: string) => void
}
const SearchList = ({
  result,
  isSearching,
  searchTerm,
  setSelectedUser,
  setSearch,
  setIsSearching,
  setSearchResult,
  setComponentType
}: SearchListProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile } = useAppSelector((state) => state.user)
  const addUsernameToUrlQuery = (user: any) => {
    setComponentType('searchList')
    setSelectedUser(user)
    const url = `${location.pathname}?${createSearchParams({ username: user.username.toLowerCase(), id: user._id })}`
    navigate(url)
    setSearch('')
    setIsSearching(false)
    setSearchResult([])
  }
  return (
    <div className='overflow-y-scroll base-hidden-scroll w-full p-2'>
      <div className='w-full flex items-center justify-center flex-col gap-2'>
        {!isSearching && result.length > 0 && (
          <>
            {result.map((user) => {
              return (
                <div
                  aria-hidden='true'
                  className='w-full bg-gray-100 shadow-md p-2 rounded-lg capitalize'
                  key={user._id}
                  onClick={() => addUsernameToUrlQuery(user)}
                >
                  <Avatar style={{ color: '#333' }} avatar={user.profilePicture} fullName={user.username} />
                </div>
              )
            })}
          </>
        )}
        {searchTerm && isSearching && result.length === 0 && (
          <div>
            <span>Đang Tìm kiếm...</span>
          </div>
        )}
        {searchTerm && !isSearching && result.length === 0 && (
          <div className='text-white'>
            <span>Hông tìm thấy người nào.</span>
            <p>Không tìm thấy cho từ khoá {searchTerm}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchList
