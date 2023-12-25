import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input, Loading } from 'src/components'
import { RegisterSchema, registerSchema } from 'src/services/utilities/rules'
import EmailSvg from 'src/components/icons/Email'
import User from 'src/components/icons/User'
import Lock from 'src/components/icons/Lock'
import authService from 'src/services/api/auth/auth.service'
import Utils from 'src/services/utilities/utils'
import withBaseComponent from 'src/hooks/withBaseComponent'
import { toast } from 'react-toastify'
import { memo, useEffect, useState } from 'react'
import useLocalStorage from 'src/hooks/useLocalStorage'
import useSessionStorage from 'src/hooks/useSessionStorage'
import IHocProps from 'src/interfaces/hoc.interface'

function Register({ dispatch, navigate }: IHocProps) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [setStoredEmail] = useLocalStorage('email', 'set')
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set')
  const [pageReload] = useSessionStorage('pageReload', 'set')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema)
  })
  const whenSubmit = handleSubmit(async (data) => {
    try {
      const avatarColor = Utils.randomAvatarColor()
      const avatarImage = Utils.generateAvatar(data.username.charAt(0).toUpperCase(), 'white', avatarColor)
      setLoading(true)
      const response = await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
        avatarColor: avatarColor,
        avatarImage
      })
      if (response.status === 201) {
        setLoggedIn(true)
        setStoredEmail(data.email)
        toast(response.data.message)
        Utils.dispatchUser({ response, pageReload, dispatch, setUser })
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  })
  useEffect(() => {
    if (loading && !user) return
    if (user) navigate('/home/feeds')
  }, [loading, user, navigate])
  return (
    <>
      {loading && <Loading />}
      <form className='w-full' onSubmit={whenSubmit}>
        <div className='md:flex gap-2'>
          <Input
            className='md:w-2/4'
            errorMessage={errors.email?.message}
            name='email'
            register={register}
            labelText='Email'
            firstIcon={
              <p className='p-1'>
                <User width='31' height='28' />
              </p>
            }
            styleInput='border w-full bg-yellow-10 px-16 rounded-md shadow-1'
            placeholder='Vui lòng nhập email'
            type='text'
          />
          <Input
            className='md:w-2/4'
            errorMessage={errors.username?.message}
            name='username'
            register={register}
            labelText='Username'
            firstIcon={<EmailSvg width='36' height='34' />}
            styleInput='border w-full bg-yellow-10 px-16 rounded-md shadow-1'
            placeholder='Vui lòng nhập username'
            type='text'
          />
        </div>
        <div className='md:flex gap-2'>
          <Input
            errorMessage={errors.password?.message}
            register={register}
            className='md:w-2/4'
            name='password'
            labelText='Password'
            firstIcon={<Lock width='36' height='34' />}
            styleInput='border w-full bg-yellow-10 px-16  rounded-md shadow-1'
            placeholder='Vui lòng nhập mật khẩu'
            type='password'
          />
          <Input
            errorMessage={errors.confirm?.message}
            register={register}
            name='confirm'
            className='md:w-2/4'
            labelText='Confirm Password'
            firstIcon={<Lock width='36' height='34' />}
            styleInput='border w-full bg-yellow-10 px-16  rounded-md shadow-1'
            placeholder='Xác nhận lại mật khẩu'
            type='password'
          />
        </div>
        <button className='border-none block mx-auto font-bold text-white px-20 rounded-md py-3 my-10 style-bg-main'>
          Register
        </button>
      </form>
    </>
  )
}

export default withBaseComponent(memo(Register))
