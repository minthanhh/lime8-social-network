import userService from 'src/services/api/user/user.service'
import { addUser } from 'src/store/slices/user/user.slice'
import Utils from 'src/services/utilities/utils'
import React, { useCallback, useState } from 'react'
import { useAppSelector } from 'src/hooks/useRedux'
import useLocalStorage from 'src/hooks/useLocalStorage'
import useSessionStorage from 'src/hooks/useSessionStorage'
import IHocProps from 'src/interfaces/hoc.interface'
import useEffectOnce from 'src/hooks/useEffectOnce'
import { Navigate } from 'react-router-dom'
import withBaseComponent from 'src/hooks/withBaseComponent'
import { toast } from 'react-toastify'
import { getConversationList } from 'src/store/api/chat'

interface IProtectedRoutes extends IHocProps {
  children: React.ReactNode
}
const ProtectedRoutes = ({ children, navigate, dispatch }: IProtectedRoutes) => {
  const { token, profile } = useAppSelector((state) => state.user)
  const [userData, setUserData] = useState(null)
  const [tokenIsValid, setTokenIsValid] = useState(false)
  const keepLoggedIn = useLocalStorage('keepLoggedIn', 'get')
  const pageReload = useSessionStorage('pageReload', 'get')
  const [deleteStorageUsername] = useLocalStorage('username', 'delete')
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set')
  const [deleteSessionPageReload] = useSessionStorage('pageReload', 'delete')

  const checkUser = useCallback(async () => {
    try {
      const response = await userService.checkCurrentUser()
      dispatch(getConversationList())
      setUserData(response.data.user)
      setTokenIsValid(true)
      dispatch(addUser({ token: response.data.token, profile: response.data.user }))
    } catch (error: any) {
      setTokenIsValid(false)
      setTimeout(async () => {
        Utils.clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn })
        await userService.logoutUser()
        navigate('/')
      }, 1000)
    }
  }, [dispatch, navigate, deleteStorageUsername, deleteSessionPageReload, setLoggedIn])
  useEffectOnce(() => {
    checkUser()
  })
  if (keepLoggedIn || (!keepLoggedIn && userData) || (profile && token) || pageReload) {
    if (!tokenIsValid) {
      return <></>
    } else {
      return <>{children}</>
    }
  } else {
    return <>{<Navigate to='/' replace={true} />}</>
  }
}

export default withBaseComponent(ProtectedRoutes)
