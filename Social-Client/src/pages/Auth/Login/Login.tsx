import { memo, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input, CheckBox, Loading } from 'src/components'
import { LoginSchema, loginSchema } from 'src/services/utilities/rules'
import EmailSvg from 'src/components/icons/Email'
import Lock from 'src/components/icons/Lock'
import useLocalStorage from 'src/hooks/useLocalStorage'
import withBaseComponent from 'src/hooks/withBaseComponent'
import IHocProps from 'src/interfaces/hoc.interface'
import { toast } from 'react-toastify'
import authService from 'src/services/api/auth/auth.service'
import Utils from 'src/services/utilities/utils'
import useSessionStorage from 'src/hooks/useSessionStorage'
import { Link } from 'react-router-dom'

function Login({ dispatch, navigate }: IHocProps) {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [setStoredEmail] = useLocalStorage('email', 'set')
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set')
  const [pageReload] = useSessionStorage('pageReload', 'set')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authService.login(data)
      setLoading(true)
      if (response.status === 200) {
        setLoggedIn(keepLoggedIn)
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
      <form className='w-full md:px-5' onSubmit={onSubmit}>
        <Input
          errorMessage={errors.email?.message}
          name={'email'}
          register={register}
          labelText={'Email'}
          firstIcon={<EmailSvg width='36' height='34' />}
          styleInput='border w-full bg-yellow-10 px-16 rounded-md shadow-1'
          placeholder={`Vui lòng nhập email  của bạn`}
          type='text'
        />
        <Input
          errorMessage={errors.password?.message}
          register={register}
          name='password'
          labelText='Mật khẩu'
          firstIcon={<Lock width='36' height='34' />}
          styleInput='border w-full bg-yellow-10 px-16  rounded-md shadow-1'
          placeholder='Vui lòng nhập mật khẩu của bạn'
          type='password'
        />
        <div className='flex items-center justify-between'>
          <CheckBox
            id='remember'
            value={keepLoggedIn}
            onChange={setKeepLoggedIn}
            name='remember'
            textCheck='Keep Login'
          />

          <Link to={'/forgot-password'} className='text-sm style-main font-bold'>
            Forgot password
          </Link>
        </div>
        <button
          type='submit'
          className='border-none block mx-auto font-bold text-white px-20 rounded-md py-3 my-10 style-bg-main'
        >
          Login
        </button>
      </form>
    </>
  )
}
export default withBaseComponent(memo(Login))
