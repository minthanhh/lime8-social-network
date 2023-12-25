import { Input, Loading } from 'src/components'
import bgImg from 'src/assets/bg/bg-auth.jpeg'
import { ResetPasswordSchema, resetPassword } from 'src/services/utilities/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import authService from 'src/services/api/auth/auth.service'
import Lock from 'src/components/icons/Lock'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchema>({
    resolver: yupResolver(resetPassword)
  })

  const onSubmit = handleSubmit(async (data: ResetPasswordSchema) => {
    try {
      const response = await authService.changePassword(searchParams.get('token') as string, data)
      setLoading(true)
      if (response.status === 200) {
        toast(response.data.message)
      }
      setLoading(false)
      navigate('/')
    } catch (error: any) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  })

  return (
    <>
      {loading && <Loading />}
      <div className='w-full h-screen flex relative'>
        <div className='md:w-1/3 h-full hidden md:block'>
          <img className='w-full h-full object-cover' src={bgImg} alt='' />
        </div>
        <div className='w-full flex items-center flex-col justify-center relative md:w-2/3'>
          <div className='px-4 md:p-0 w-full'>
            <div className='logo flex items-center gap-2 justify-center absolute top-4 left-4 md:relative md:left-0 md:top-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-10 h-10 md:w-[82px] md:h-[76px]'
                viewBox='0 0 114 111'
                fill='none'
              >
                <path
                  d='M80.4039 5.62314C69.3811 5.64525 55.9606 9.69892 46.1345 13.7732C43.3341 12.1873 40.0796 11.2536 36.5466 11.1109C32.361 10.9418 27.7875 11.8751 23.1122 14.119L22.786 14.2751L22.7653 14.2816C11.5223 18.9609 4.91882 30.5184 4.23499 43.4947C24.5589 39.4515 7.63416 67.4909 17.1136 77.4031C40.3175 95.7326 63.2246 105.002 86.6455 105.695C96.578 105.695 101.638 102.968 102.232 96.9081C105.422 86.9094 105.605 75.4473 105.169 64.7202C102.336 74.0208 99.4755 83.3192 94.5672 92.4908C93.2908 92.5249 91.8878 92.4962 90.3668 92.3889C88.0732 96.7147 85.6169 100.304 81.5565 102.551C84.3847 98.9553 85.9928 94.9181 87.3329 89.2866C89.1005 80.6359 89.9716 71.9823 90.6099 63.3316L78.1409 90.079C77.581 89.9114 77.0231 89.7375 76.4673 89.5573C61.8227 78.1668 55.5858 67.2589 56.0001 56.6855C56.394 46.64 62.894 36.3439 75.1899 25.9004C75.5549 25.8271 75.9208 25.7508 76.2801 25.6836C80.6412 35.5717 84.0215 45.4034 86.993 55.2083C88.4877 45.6042 88.1803 35.8934 86.4649 26.0968C85.3592 21.8215 83.9522 18.5575 81.6883 15.5951C85.5725 17.4431 88.5799 20.0109 90.6861 24.2943C91.874 24.2943 92.9989 24.3232 94.0464 24.3758C102.044 32.8444 105.807 42.3565 108.494 52.3832C109.837 37.4606 105.945 23.8614 96.5462 11.6592L95.7126 10.1828C92.1013 6.88533 86.6393 5.61056 80.4039 5.62314ZM35.7548 15.108C35.9555 15.1091 36.1548 15.1136 36.3525 15.1214C39.0936 15.2298 41.5501 15.9461 43.684 17.093C41.5254 20.5522 38.262 22.7572 34.3387 24.037C30.7407 25.2112 26.6073 25.5125 22.5361 25.155C23.9813 22.7139 25.3421 20.1431 25.8895 17.3642C29.4255 15.8076 32.7491 15.0889 35.7548 15.108ZM66.9072 27.9192C57.5395 37.1942 52.2335 46.7053 51.8487 56.5299C51.4563 66.5363 56.2498 76.4535 66.3452 86.2245C59.2047 83.8137 51.5081 80.8794 45.3085 76.6783C37.891 72.6509 32.0189 67.5663 28.9514 61.2723C25.5189 54.2292 25.8899 45.7713 31.2771 36.6997L34.8666 38.7324C29.9783 46.9641 29.8472 53.6766 32.7005 59.5314C32.9558 60.0553 33.2337 60.5684 33.5336 61.0694C33.1448 59.3653 32.9433 57.5547 32.9644 55.6223C33.1204 41.3211 51.5457 32.3306 66.9072 27.9192Z'
                  fill='url(#paint0_linear_886_194)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_886_194'
                    x1='2.91622'
                    y1='56.923'
                    x2='107.916'
                    y2='56.9229'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#2ECEC2' />
                    <stop offset='0.276042' stopColor='#34BAD0' />
                    <stop offset={1} stopColor='#3B89F1' />
                  </linearGradient>
                </defs>
              </svg>
              <span className='font-bold text-7xl style-main block-select hidden md:block'>lime8</span>
            </div>
            <h2 className='text-center font-bold text-3xl text-black-1 my-5'>Reset Password</h2>
            <div className='flex flex-col items-center md:w-3/4 mx-auto'>
              <form className='w-full md:px-5' onSubmit={onSubmit}>
                <Input
                  errorMessage={errors.password?.message}
                  name={'password'}
                  register={register}
                  labelText={'Password'}
                  firstIcon={<Lock width='36' height='34' />}
                  styleInput='border w-full bg-yellow-10 px-16 rounded-md shadow-1'
                  placeholder={`Vui lòng nhập mật khẩu của bạn`}
                  type='text'
                />

                <Input
                  errorMessage={errors.confirmPassword?.message}
                  name={'confirmPassword'}
                  register={register}
                  labelText={'Confirm Password'}
                  firstIcon={<Lock width='36' height='34' />}
                  styleInput='border w-full bg-yellow-10 px-16 rounded-md shadow-1'
                  placeholder={`Vui lòng nhập lại mật khẩu của bạn`}
                  type='text'
                />

                <button
                  type='submit'
                  className='border-none block mx-auto font-bold text-white px-20 rounded-md py-3 my-10 style-bg-main'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
