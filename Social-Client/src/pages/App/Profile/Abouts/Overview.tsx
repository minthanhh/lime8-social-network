import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import Public from 'src/assets/icons/components/privacy/Public'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import profileService from 'src/services/api/profile/profile.service'
import { updateUserProfile } from 'src/store/slices/user/user.slice'
import { updateCurrentProfile } from 'src/store/slices/profile/profile.slice'

const Overview = () => {
  const { profile } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector((state) => state.user.profile)
  const currentProfile = useAppSelector((state) => state.profile.profile)

  const [inputValues, setInputValues] = useState<{ [x: string]: string }>({
    work: '',
    school: '',
    location: ''
  })
  const [inputFields, setInputFields] = useState<{ [x: string]: boolean }>({
    work: false,
    school: false,
    location: false
  })

  const handleToggleShowInputFields = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id as string

    if (inputFields[id] === false) {
      setInputValues({ ...inputValues, [id]: '' })
    }

    setInputFields({ ...inputFields, [id]: !inputFields[id] })
  }

  const handleSetInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setInputValues({ ...inputValues, [id]: value })
  }

  const handleUpdateInfoProfile = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const id = e.currentTarget.id

      if (inputValues[id] === '') return

      await profileService.updateInfoProfile({ [id]: inputValues[id] })
      dispatch(updateUserProfile({ [id]: inputValues[id] }))
      dispatch(updateCurrentProfile({ [id]: inputValues[id] }))
      toast.success('Updated profile')
      setInputValues({ ...inputValues, [id]: '' })
      setInputFields({ ...inputFields, [id]: false })
    },
    [inputValues, inputFields, dispatch]
  )

  return (
    <div className='flex flex-col gap-6'>
      {profile.work !== '' && !inputFields.work ? (
        <div className='flex items-center'>
          <i className='fa-solid fa-briefcase text-lg mr-3'></i>
          <span className='text-sm font-medium flex-1'>Nhân viên tại {profile.work}</span>

          {currentUser._id === currentProfile._id && (
            <button
              onClick={() => setInputFields({ ...inputFields, work: true })}
              className='hover:bg-slate-100 px-2 py-1 rounded-full cursor-pointer'
            >
              <i className='fa-regular fa-pen-to-square'></i>
            </button>
          )}
        </div>
      ) : currentUser._id !== currentProfile._id ? (
        <div className='flex items-center mr-3'>
          <i className='fa-solid fa-briefcase text-lg mr-3'></i>
          Chưa thêm nơi làm việc
        </div>
      ) : (
        <>
          {inputFields.work && (
            <div className='flex flex-col'>
              <input
                type='text'
                className='border bg-light dark:bg-dark py-2.5 px-3 rounded-md outline-none shadow font-medium appearance-none text-sm'
                placeholder='Công ty'
                autoComplete='off'
                id='work'
                onChange={handleSetInputValues}
                value={inputValues.work}
              />

              <div className='flex items-center justify-between border-t py-2 mt-2'>
                <button className='mr-auto flex items-center gap-1 rounded-md bg-lightMain dark:bg-darkMain shadow py-1.5 px-2 font-semibold text-sm hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain'>
                  <Public height='20' width='20' />
                  Công khai
                </button>
                <div
                  id='work'
                  aria-hidden='true'
                  onClick={handleToggleShowInputFields}
                  className='w-max py-1.5 cursor-pointer mr-2 px-2 hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain bg-lightMain dark:bg-darkMain shadow rounded-md text-dark dark:text-light font-semibold text-sm '
                >
                  Hủy
                </div>
                <div
                  id='work'
                  aria-hidden='true'
                  onClick={handleUpdateInfoProfile}
                  className={clsx(
                    'w-max py-1.5 px-2 shadow rounded-md font-semibold text-sm',
                    inputValues.work !== ''
                      ? 'cursor-pointer style-bg-main text-light'
                      : 'cursor-not-allowed bg-gray-300 text-dark/30'
                  )}
                >
                  Lưu
                </div>
              </div>
            </div>
          )}
          {inputFields.work === false && (
            <div
              onClick={handleToggleShowInputFields}
              id='work'
              aria-hidden='true'
              className='flex items-center gap-2 group cursor-pointer'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M16.6151 10.9415H12.6183V6.94473C12.6183 6.82904 12.5236 6.73438 12.4079 6.73438H11.1458C11.0301 6.73438 10.9354 6.82904 10.9354 6.94473V10.9415H6.93863C6.82293 10.9415 6.72827 11.0362 6.72827 11.1519V12.414C6.72827 12.5297 6.82293 12.6244 6.93863 12.6244H10.9354V16.6212C10.9354 16.7369 11.0301 16.8315 11.1458 16.8315H12.4079C12.5236 16.8315 12.6183 16.7369 12.6183 16.6212V12.6244H16.6151C16.7307 12.6244 16.8254 12.5297 16.8254 12.414V11.1519C16.8254 11.0362 16.7307 10.9415 16.6151 10.9415Z'
                  className='fill-dark dark:fill-light'
                />
                <path
                  d='M11.7798 0C5.27446 0 -0.000244141 5.27471 -0.000244141 11.78C-0.000244141 18.2853 5.27446 23.56 11.7798 23.56C18.2851 23.56 23.5598 18.2853 23.5598 11.78C23.5598 5.27471 18.2851 0 11.7798 0ZM11.7798 21.5616C6.37884 21.5616 1.99815 17.1809 1.99815 11.78C1.99815 6.37908 6.37884 1.99839 11.7798 1.99839C17.1807 1.99839 21.5614 6.37908 21.5614 11.78C21.5614 17.1809 17.1807 21.5616 11.7798 21.5616Z'
                  className='fill-dark dark:fill-light'
                />
              </svg>

              <span className='text-sm font-medium group-hover:underline group-hover:underline-offset-2'>
                Thêm nơi làm việc
              </span>
            </div>
          )}
        </>
      )}

      {/* High School */}
      {profile.school !== '' && !inputFields.school ? (
        <div className='flex items-center'>
          <i className='fa-solid fa-school mr-3 text-lg'></i>
          <span className='text-sm font-medium flex-1'>Học tại {profile.school}</span>

          {currentUser._id === currentProfile._id && (
            <button
              onClick={() => setInputFields({ ...inputFields, school: true })}
              className='hover:bg-slate-100 px-2 py-1 rounded-full cursor-pointer'
            >
              <i className='fa-regular fa-pen-to-square'></i>
            </button>
          )}
        </div>
      ) : currentUser._id !== currentProfile._id ? (
        <div className='flex items-center mr-3'>
          <i className='fa-solid fa-school mr-3 text-lg'></i>
          Chưa thêm trường trung học
        </div>
      ) : (
        <>
          {inputFields.school && (
            <div className='flex flex-col'>
              <input
                type='text'
                className='border bg-light dark:bg-dark py-2.5 px-3 rounded-md outline-none shadow font-medium appearance-none text-sm'
                placeholder='Trường học'
                autoComplete='off'
                id='school'
                value={inputValues.school}
                onChange={handleSetInputValues}
              />

              <div className='flex items-center justify-between border-t py-2 mt-2'>
                <button className='mr-auto flex items-center gap-1 rounded-md bg-lightMain dark:bg-darkMain shadow py-1.5 px-2 font-semibold text-sm hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain'>
                  <Public height='20' width='20' />
                  Công khai
                </button>
                <div
                  id='school'
                  aria-hidden='true'
                  onClick={handleToggleShowInputFields}
                  className='w-max py-1.5 cursor-pointer mr-2 px-2 hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain bg-lightMain dark:bg-darkMain shadow rounded-md text-dark dark:text-light font-semibold text-sm '
                >
                  Hủy
                </div>
                <div
                  id='school'
                  aria-hidden='true'
                  onClick={handleUpdateInfoProfile}
                  className={clsx(
                    'w-max py-1.5 px-2 shadow rounded-md font-semibold text-sm',
                    inputValues.school !== ''
                      ? 'cursor-pointer style-bg-main text-light'
                      : 'cursor-not-allowed bg-gray-300 text-dark/30'
                  )}
                >
                  Lưu
                </div>
              </div>
            </div>
          )}
          {inputFields.school === false && (
            <div
              onClick={handleToggleShowInputFields}
              id='school'
              aria-hidden='true'
              className='flex items-center gap-2 group cursor-pointer'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M16.6151 10.9415H12.6183V6.94473C12.6183 6.82904 12.5236 6.73438 12.4079 6.73438H11.1458C11.0301 6.73438 10.9354 6.82904 10.9354 6.94473V10.9415H6.93863C6.82293 10.9415 6.72827 11.0362 6.72827 11.1519V12.414C6.72827 12.5297 6.82293 12.6244 6.93863 12.6244H10.9354V16.6212C10.9354 16.7369 11.0301 16.8315 11.1458 16.8315H12.4079C12.5236 16.8315 12.6183 16.7369 12.6183 16.6212V12.6244H16.6151C16.7307 12.6244 16.8254 12.5297 16.8254 12.414V11.1519C16.8254 11.0362 16.7307 10.9415 16.6151 10.9415Z'
                  className='fill-dark dark:fill-light'
                />
                <path
                  d='M11.7798 0C5.27446 0 -0.000244141 5.27471 -0.000244141 11.78C-0.000244141 18.2853 5.27446 23.56 11.7798 23.56C18.2851 23.56 23.5598 18.2853 23.5598 11.78C23.5598 5.27471 18.2851 0 11.7798 0ZM11.7798 21.5616C6.37884 21.5616 1.99815 17.1809 1.99815 11.78C1.99815 6.37908 6.37884 1.99839 11.7798 1.99839C17.1807 1.99839 21.5614 6.37908 21.5614 11.78C21.5614 17.1809 17.1807 21.5616 11.7798 21.5616Z'
                  className='fill-dark dark:fill-light'
                />
              </svg>

              <span className='text-sm font-medium group-hover:underline group-hover:underline-offset-2'>
                Thêm trường trung học
              </span>
            </div>
          )}
        </>
      )}

      {profile.location !== '' && !inputFields.location ? (
        <div className='flex items-center'>
          <i className='fa-solid fa-location-dot text-lg mr-3'></i>
          <span className='text-sm font-medium flex-1'>Sống tại {profile.location}</span>

          {currentUser._id === currentProfile._id && (
            <button
              onClick={() => setInputFields({ ...inputFields, location: true })}
              className='hover:bg-slate-100 px-2 py-1 rounded-full cursor-pointer'
            >
              <i className='fa-regular fa-pen-to-square'></i>
            </button>
          )}
        </div>
      ) : currentUser._id !== currentProfile._id ? (
        <div className='flex items-center mr-3'>
          <i className='fa-solid fa-location-dot text-lg mr-3'></i>
          Chưa có tỉnh/thành phố hiện tại
        </div>
      ) : (
        <>
          {inputFields.location && (
            <div className='flex flex-col'>
              <input
                type='text'
                className='border bg-light dark:bg-dark py-2.5 px-3 rounded-md outline-none shadow font-medium appearance-none text-sm'
                placeholder='Tỉnh/Thành phố hiện tại'
                autoComplete='off'
                id='location'
                value={inputValues.location}
                onChange={handleSetInputValues}
              />
              <div className='flex items-center justify-between border-t py-2 mt-2'>
                <button className='mr-auto flex items-center gap-1 rounded-md bg-lightMain dark:bg-darkMain shadow py-1.5 px-2 font-semibold text-sm hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain'>
                  <Public height='20' width='20' />
                  Công khai
                </button>
                <div
                  id='location'
                  aria-hidden='true'
                  onClick={handleToggleShowInputFields}
                  className='w-max py-1.5 cursor-pointer mr-2 px-2 hover:bg-lightMain/40 transition-all ease-linear duration-150 hover:shadow-shadowMain bg-lightMain dark:bg-darkMain shadow rounded-md text-dark dark:text-light font-semibold text-sm '
                >
                  Hủy
                </div>
                <div
                  aria-hidden='true'
                  id='location'
                  onClick={handleUpdateInfoProfile}
                  className={clsx(
                    'w-max py-1.5 px-2 shadow rounded-md font-semibold text-sm',
                    inputValues.location !== ''
                      ? 'cursor-pointer style-bg-main text-light'
                      : 'cursor-not-allowed bg-gray-300 text-dark/30'
                  )}
                >
                  Lưu
                </div>
              </div>
            </div>
          )}
          {inputFields.location === false && (
            <div
              onClick={handleToggleShowInputFields}
              id='location'
              aria-hidden='true'
              className='flex items-center gap-2 group cursor-pointer'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M16.6151 10.9415H12.6183V6.94473C12.6183 6.82904 12.5236 6.73438 12.4079 6.73438H11.1458C11.0301 6.73438 10.9354 6.82904 10.9354 6.94473V10.9415H6.93863C6.82293 10.9415 6.72827 11.0362 6.72827 11.1519V12.414C6.72827 12.5297 6.82293 12.6244 6.93863 12.6244H10.9354V16.6212C10.9354 16.7369 11.0301 16.8315 11.1458 16.8315H12.4079C12.5236 16.8315 12.6183 16.7369 12.6183 16.6212V12.6244H16.6151C16.7307 12.6244 16.8254 12.5297 16.8254 12.414V11.1519C16.8254 11.0362 16.7307 10.9415 16.6151 10.9415Z'
                  className='fill-dark dark:fill-light'
                />
                <path
                  d='M11.7798 0C5.27446 0 -0.000244141 5.27471 -0.000244141 11.78C-0.000244141 18.2853 5.27446 23.56 11.7798 23.56C18.2851 23.56 23.5598 18.2853 23.5598 11.78C23.5598 5.27471 18.2851 0 11.7798 0ZM11.7798 21.5616C6.37884 21.5616 1.99815 17.1809 1.99815 11.78C1.99815 6.37908 6.37884 1.99839 11.7798 1.99839C17.1807 1.99839 21.5614 6.37908 21.5614 11.78C21.5614 17.1809 17.1807 21.5616 11.7798 21.5616Z'
                  className='fill-dark dark:fill-light'
                />
              </svg>

              <span className='text-sm font-medium group-hover:underline group-hover:underline-offset-2'>
                Thêm tỉnh/thành phố hiện tại
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Overview
