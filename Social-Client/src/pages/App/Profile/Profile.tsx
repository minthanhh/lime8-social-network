import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { DefaultAvatar } from 'src/assets/bg'
import EditSvg from 'src/assets/icons/components/EditSvg'
import { Button } from 'src/components'
import { swalBlockedOptions, swalSuccessOptions } from 'src/components/Chat/window/Blocked/Blocked'
import LoadingSmall from 'src/components/Global/SearchLoading'
import User from 'src/components/User/User'
import { AddSvg } from 'src/components/icons'
import AppSettings from 'src/configs/appsettings'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { useTheme } from 'src/hooks/useTheme'
import { IUser } from 'src/interfaces'
import imageService from 'src/services/api/image/image.service'
import profileService from 'src/services/api/profile/profile.service'
import userService from 'src/services/api/user/user.service'
import socketService from 'src/services/socket/socket.service'
import { ImageUtils } from 'src/services/utilities/image.utils'
import { getAllProfileOfUser } from 'src/store/api/profile'
import { toggleOpenMainModal } from 'src/store/slices/modal/modal.slice'
import { updateCurrentProfile } from 'src/store/slices/profile/profile.slice'
import { toggleOpenModalAvatar, toggleOpenModalBackground, updateUserProfile } from 'src/store/slices/user/user.slice'
import Swal from 'sweetalert2'

const IsActive = 'text-dark text-xs font-semibold whitespace-nowrap dark:text-light sm:text-sm'
const NotActive = 'text-dark text-xs font-semibold whitespace-nowrap dark:text-light sm:text-sm'

const Profile = () => {
  const { userId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isOpenModalAvatar = useAppSelector((state) => state.user.isOpenModalAvatar)
  const isOpenModalBackground = useAppSelector((state) => state.user.isOpenModalBackground)

  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [watchImageModal, setWatchImageModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const { profile, posts } = useAppSelector((state) => state.profile)
  const currentUserProfile = useAppSelector((state) => state.user.profile)

  const [currentProfile, setCurrentProfile] = useState<any | null>(null)
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { chooseTheme } = useTheme()

  useEffect(() => {
    if (profile._id) {
      const getImages = async () => {
        const result = await imageService.getImagesOfUser(profile._id)
        setImages(result.data.images)
      }

      getImages()
    }
  }, [profile._id])

  useEffect(() => {
    if (userId) {
      const getProfileByUserId = async () => {
        const profile = await profileService.getUserProfileById(userId)

        if (profile.data.user.birthday === 'undefined') {
          navigate('**', {
            replace: true
          })
        } else {
          setCurrentProfile(profile.data.user)
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      getProfileByUserId()
    }
  }, [userId, navigate])

  useEffect(() => {
    if (currentProfile) {
      dispatch(
        getAllProfileOfUser({
          userId: currentProfile?._id,
          uId: currentProfile?.uId,
          username: currentProfile.username
        })
      )
    }
  }, [currentProfile, dispatch])

  useEffect(() => {
    socketService.socket?.on('update user', (profile: any) => {
      if (profile.bgImageId !== '') {
        dispatch(updateUserProfile({ profilePicture: profile.profilePicture }))
      } else if (profile.bgImageId === '') {
        updateUserProfile({ bgImageId: profile.userId.bgImageId, bgImageVersion: profile.userId.bgImageVersion })
      } else {
        dispatch(updateUserProfile({ profilePicture: profile.profilePicture }))
      }
    })
  }, [dispatch])

  useEffect(() => {
    socketService.socket?.on('add post', (post: any) => {
      if (profile._id === post.userId) {
        post = [posts, post]
        dispatch(updateUserProfile({ postsCount: post.length }))
      }
    })
  }, [posts, dispatch, profile._id])

  useEffect(() => {
    socketService.socket?.on('remove follower', ({ followeeId, followersCount }: any) => {
      if (profile._id === followeeId) {
        dispatch(
          updateUserProfile({
            followersCount: profile.followersCount - followersCount
          })
        )
      }
    })
  }, [profile, dispatch])

  const handleShowModalAvatar = useCallback(
    (type: string) => {
      dispatch(toggleOpenModalAvatar())
      setModalType(type)
    },
    [dispatch]
  )

  const handleInputImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      setImagePreview(URL.createObjectURL(file))
      setFile(file)
    }
  }

  const handleUpdateAvatar = useCallback(
    async (type: string) => {
      setLoading(true)
      if (!file) return

      ImageUtils.checkFile(file, 'image')
      const base64 = await ImageUtils.readFileToBase64(file)

      if (type === 'avatar') {
        await imageService.updateAvatarProfile(base64)
        dispatch(toggleOpenModalAvatar())
      } else {
        await imageService.updateBackgroundProfile(base64)
        dispatch(toggleOpenModalBackground())
      }

      URL.revokeObjectURL(imagePreview)
      setImagePreview('')
      setLoading(false)
    },
    [file, dispatch, imagePreview]
  )

  const handleDeleteImageUpload = useCallback(
    async (type: string) => {
      setLoading(true)

      if (type === 'avatar') {
        await imageService.deleteAvatarProfile(
          images.find((image) => image.imgId === profile.profilePicture.split('/').at(-1))?._id
        )
        dispatch(toggleOpenModalAvatar())
        dispatch(updateUserProfile({ profilePicture: '' }))
      } else {
        await imageService.deleteBackgroundProfile(
          images.find(
            (image) => image.bgImageId === profile.bgImageId && image.bgImageVersion === profile.bgImageVersion
          )._id
        )
        dispatch(toggleOpenModalBackground())
        dispatch(updateUserProfile({ bgImageVersion: '', bgImageId: '' }))
      }

      setWatchImageModal(false)
      setLoading(false)
    },
    [profile, dispatch, images]
  )

  const handleBlockingUser = async () => {
    try {
      if (currentUserProfile?.blocked.includes(profile?._id)) {
        const { isConfirmed } = await Swal.fire(
          swalBlockedOptions(profile?.username, chooseTheme, async () => {
            await userService.userUnBlockedByAccountOwner(profile?._id)
            dispatch(updateUserProfile({ blocked: currentUserProfile?.blocked.filter((id) => id !== id) }))
          })
        )
        if (!isConfirmed) return
        Swal.fire({
          ...swalSuccessOptions(chooseTheme),
          title: 'Unblocked successfully',
          text: 'You can now send messages'
        })
      } else {
        const { isConfirmed } = await Swal.fire({
          ...swalBlockedOptions(profile?.username, chooseTheme, async () => {
            await userService.userUnBlockedByAccountOwner(profile?._id)
            dispatch(updateUserProfile({ blocked: currentUserProfile?.blocked.filter((id) => id !== id) }))
          }),
          text: `You really want to block ${profile?.username}?`
        })

        if (!isConfirmed) return
        Swal.fire({
          ...swalSuccessOptions(chooseTheme),
          title: 'Block successfully',
          text: 'You have blocked this user'
        })
        await userService.userBlockedByAccountOwner(profile?._id)
        dispatch(
          updateUserProfile({
            blocked: [...currentUserProfile!.blocked, profile?._id]
          })
        )
        console.log('Blocked')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socketService.socket?.on('add follower', (data: any) => {
      if (profile._id === data._id) {
        dispatch(updateCurrentProfile({ followersCount: data.followersCount, followingCount: data.followingCount }))
      }
    })
  }, [profile._id, dispatch])

  useEffect(() => {
    socketService.socket?.on('remove follower', ({ followeeId, followersCount }: any) => {
      if (profile._id === followeeId) {
        console.log(followeeId, followersCount)

        dispatch(
          updateCurrentProfile({
            followersCount: profile.followersCount - followersCount
          })
        )
      }
    })
  }, [profile, dispatch])

  if (!currentUserProfile?.blocked.includes(profile._id)) {
    return (
      <>
        <div className='w-full h-full text-dark dark:text-light bg-lightMain dark:bg-darkMain mb-8'>
          <div className='-mt-[72px] h-96 relative overflow-hidden group flex items-center bg-gray-200 justify-center'>
            <div
              className='absolute inset-0 w-full h-auto bg-center object-cover bg-black/50'
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dgyk7uloc/image/upload/v${profile.bgImageVersion}/${profile.bgImageId}")`
              }}
            />

            {currentUserProfile?._id === profile._id && !profile.bgImageId && (
              <div className='border border-dark dark:border-light px-2 py-1.5 rounded-full mb-3 relative z-50'>
                <button
                  onClick={() => dispatch(toggleOpenModalBackground())}
                  className='outline-none border-none bg-transparent'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 45 55' fill='none'>
                    <path
                      d='M35.625 24.0622V45.833C35.625 46.4408 35.4275 47.0237 35.0758 47.4535C34.7242 47.8832 34.2473 48.1247 33.75 48.1247H7.5C7.00272 48.1247 6.52581 47.8832 6.17417 47.4535C5.82254 47.0237 5.625 46.4408 5.625 45.833V13.7497C5.625 13.1419 5.82254 12.559 6.17417 12.1292C6.52581 11.6995 7.00272 11.458 7.5 11.458H24.7163'
                      className='stroke-dark dark:stroke-light'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M31.875 11.4579H39.375M35.6203 6.63965V15.8063M11.25 35.5548L16.875 26.3537L19.6875 29.7912L22.9688 23.4891L30 35.5548H11.25Z'
                      className='stroke-dark dark:stroke-light'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className='bg-light shadow-shadowMain dark:bg-dark -mt-16 px-3 sm:-mt-24 py-4 rounded-md mb-5'>
            <div className='z-40 relative max-w-7xl mx-auto flex items-center'>
              <div className='cursor-pointer relative'>
                <User
                  size='xl'
                  isLoading={isLoading}
                  alt=''
                  source={profile.profilePicture || DefaultAvatar}
                  username={profile.username}
                  styleText='text-dark dark:text-light font-semibold text-lg sm:text-xl'
                  styleContent='gap-1 sm:gap-10 sm:ml-4'
                  onClick={() => setWatchImageModal((w) => !w)}
                >
                  <div className='flex items-center text-dark'>
                    <nav className='flex items-center gap-2 sm:gap-6 mt-8 -ml-2 sm:ml-0 sm:mt-0'>
                      {AppSettings.RoutesProfile.map((route, index) => (
                        <NavLink
                          key={index}
                          to={route.pathname}
                          className={({ isActive }) => (isActive ? IsActive : NotActive)}
                        >
                          {route.label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </User>

                {watchImageModal && (
                  <div className='absolute top-[110%] shadow-shadowMain lef-0 p-2 rounded-md bg-light dark:bg-dark'>
                    <button
                      onClick={() => {
                        handleShowModalAvatar('watch')
                        setWatchImageModal(false)
                      }}
                      className='p-2 rounded-md flex items-center gap-4 hover:bg-gray-500/60'
                    >
                      <span className='border-dark border rounded-md py-1.5 px-2 dark:border-light flex items-center justify-center'>
                        <i className='fa-regular fa-user'></i>
                      </span>
                      <span className='text-sm text-bold'>See representative photo</span>
                    </button>

                    {currentUserProfile?._id === profile._id && (
                      <button
                        onClick={() => handleShowModalAvatar('change')}
                        className='p-2 rounded-md flex items-center gap-4 hover:bg-gray-500/60 w-full'
                      >
                        <span className='border-dark border rounded-md py-1.5 px-2 dark:border-light flex items-center justify-center'>
                          <i className='fa-regular fa-image'></i>
                        </span>
                        <span className='text-sm text-bold'>Select avatar</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className='sm:flex items-end flex-1 flex-col gap-10 relative z-50 hidden'>
                <div className={'flex items-center gap-6'}>
                  {isLoading ? (
                    <div className='animate-pulse flex items-center gap-6'>
                      <div className='my-2 flex items-center gap-3'>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[7.22px]'></div>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[44px]'></div>
                      </div>
                      <div className='my-2 flex items-center gap-3'>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[10px]'></div>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[77px]'></div>
                      </div>
                      <div className='my-2 flex items-center gap-3'>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[10px]'></div>
                        <div className='h-3 rounded bg-gray-300 dark:bg-gray-700 w-[77px]'></div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center gap-6'>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-semibold text-light'>{profile.postsCount}</span>
                        <p className='text-sm font-semibold text-light'>Posts</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-semibold text-light'>{profile.followingCount}</span>
                        <p className='text-sm font-semibold text-light'>Following</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-semibold text-light'>{profile.followersCount}</span>
                        <p className='text-sm font-semibold text-light'>Followers</p>
                      </div>
                    </div>
                  )}

                  {currentUserProfile?._id === profile._id && (
                    <Button
                      onClick={() => dispatch(toggleOpenModalBackground())}
                      className='flex items-center gap-1 py-1 px-3'
                    >
                      <EditSvg width='24px' height='24px' />
                      Update cover photo
                    </Button>
                  )}
                </div>
                {currentUserProfile?._id === profile._id ? (
                  <Button
                    onClick={() => dispatch(toggleOpenMainModal())}
                    className='flex items-center flex-shrink-0 justify-center gap-2 px-3 py-1 ml-10'
                  >
                    <AddSvg width='24' height='24' />
                    Create new post
                  </Button>
                ) : (
                  <button onClick={handleBlockingUser} className='flex items-center gap-2 bg-red-500 rounded-md p-1.5'>
                    <span className='text-light dark:text-light text-xs font-bold'>
                      {currentUserProfile?.blocked.includes(profile._id) ? 'Un Block' : 'Block'}
                    </span>
                    <i className='fa-solid fa-unlock text-light dark:text-light'></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className='max-w-7xl mx-auto mb-6 px-3'>
            <Outlet />
          </div>
        </div>

        {isOpenModalAvatar && modalType === 'change' && (
          <div className='fixed inset-0 w-full h-full bg-black/75 z-50 flex items-center justify-center'>
            <div className='bg-light dark:bg-dark w-[300px] p-3 rounded-md relative h-auto flex flex-col'>
              <button
                className='ml-auto'
                onClick={() => {
                  URL.revokeObjectURL(imagePreview)
                  setImagePreview('')
                  dispatch(toggleOpenModalAvatar())
                }}
              >
                <i className='fa-solid fa-xmark text-lg text-dark dark:text-light'></i>
              </button>
              <label htmlFor='image-set' className='h-full w-full cursor-pointer flex items-center justify-center '>
                <input
                  onChange={handleInputImageChange}
                  name='image-get'
                  type='file'
                  className='hidden'
                  id='image-set'
                />
                <div className='flex flex-col items-center justify-center shadow-shadowInner w-full h-[250px]'>
                  {imagePreview === '' && (
                    <div className='border border-dark dark:border-light px-2 py-1.5 rounded-full mb-3'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='35' height='40' viewBox='0 0 45 55' fill='none'>
                        <path
                          d='M35.625 24.0622V45.833C35.625 46.4408 35.4275 47.0237 35.0758 47.4535C34.7242 47.8832 34.2473 48.1247 33.75 48.1247H7.5C7.00272 48.1247 6.52581 47.8832 6.17417 47.4535C5.82254 47.0237 5.625 46.4408 5.625 45.833V13.7497C5.625 13.1419 5.82254 12.559 6.17417 12.1292C6.52581 11.6995 7.00272 11.458 7.5 11.458H24.7163'
                          className='stroke-dark dark:stroke-light'
                          strokeWidth='2'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M31.875 11.4579H39.375M35.6203 6.63965V15.8063M11.25 35.5548L16.875 26.3537L19.6875 29.7912L22.9688 23.4891L30 35.5548H11.25Z'
                          className='stroke-dark dark:stroke-light'
                          strokeWidth='2'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  )}

                  {imagePreview !== '' && (
                    <div className={`relative text-xl text-light rounded-md overflow-hidden`}>
                      <img src={imagePreview} className='w-full h-auto object-contain' alt='' />
                    </div>
                  )}
                </div>
              </label>

              <Button
                disabled={loading}
                className={clsx('w-full py-2 mt-2')}
                bg={clsx(loading && 'bg-gray-300')}
                rounded='rounded-md'
                onClick={() => handleUpdateAvatar('avatar')}
              >
                {loading ? <LoadingSmall /> : 'Upload'}
              </Button>
            </div>
          </div>
        )}
        {isOpenModalAvatar && modalType === 'watch' && (
          <div className='fixed inset-0 w-full h-full bg-black/75 z-50 flex items-center justify-center'>
            <div className='bg-light dark:bg-dark w-[300px] p-3 rounded-md relative h-auto flex flex-col'>
              <button className='ml-auto' onClick={() => dispatch(toggleOpenModalAvatar())}>
                <i className='fa-solid fa-xmark dark:text-light text-dark text-lg'></i>
              </button>

              <img src={profile.profilePicture} className='rounded-md' alt='' />

              {currentUserProfile?._id === profile._id && (
                <Button
                  disabled={loading}
                  className={clsx('w-full py-2 mt-2')}
                  bg={clsx(loading ? 'bg-gray-300' : 'bg-red-500')}
                  rounded='rounded-md'
                  onClick={() => handleDeleteImageUpload('avatar')}
                >
                  {loading ? <LoadingSmall /> : 'Delete Avatar'}
                </Button>
              )}
            </div>
          </div>
        )}

        {isOpenModalBackground && (
          <div className='fixed inset-0 w-full h-full bg-black/75 z-50 flex items-center justify-center'>
            <div className='bg-light dark:bg-dark w-[800px] p-3 rounded-md relative h-auto flex flex-col'>
              <button
                className='ml-auto'
                onClick={() => {
                  URL.revokeObjectURL(imagePreview)
                  setImagePreview('')
                  dispatch(toggleOpenModalBackground())
                }}
              >
                <i className='fa-solid fa-xmark text-lg text-dark dark:text-light'></i>
              </button>
              <label htmlFor='image-set' className='h-full w-full cursor-pointer flex items-center justify-center '>
                <input
                  onChange={handleInputImageChange}
                  name='image-get'
                  type='file'
                  className='hidden'
                  id='image-set'
                />
                <div className='flex flex-col items-center justify-center shadow-shadowInner w-full h-[250px]'>
                  {imagePreview === '' && (
                    <div className='border border-dark dark:border-light px-2 py-1.5 rounded-full mb-3'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='35' height='40' viewBox='0 0 45 55' fill='none'>
                        <path
                          d='M35.625 24.0622V45.833C35.625 46.4408 35.4275 47.0237 35.0758 47.4535C34.7242 47.8832 34.2473 48.1247 33.75 48.1247H7.5C7.00272 48.1247 6.52581 47.8832 6.17417 47.4535C5.82254 47.0237 5.625 46.4408 5.625 45.833V13.7497C5.625 13.1419 5.82254 12.559 6.17417 12.1292C6.52581 11.6995 7.00272 11.458 7.5 11.458H24.7163'
                          className='stroke-dark dark:stroke-light'
                          strokeWidth='2'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M31.875 11.4579H39.375M35.6203 6.63965V15.8063M11.25 35.5548L16.875 26.3537L19.6875 29.7912L22.9688 23.4891L30 35.5548H11.25Z'
                          className='stroke-dark dark:stroke-light'
                          strokeWidth='2'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  )}

                  {imagePreview !== '' && (
                    <div className={`relative text-xl text-light rounded-md overflow-hidden`}>
                      <img src={imagePreview} className='w-full h-auto object-contain' alt='' />
                    </div>
                  )}
                </div>
              </label>

              <Button
                disabled={loading}
                className={clsx('w-full py-2 mt-2')}
                bg={clsx(loading && 'bg-gray-300')}
                rounded='rounded-md'
                onClick={() => handleUpdateAvatar('background')}
              >
                {loading ? <LoadingSmall /> : 'Upload'}
              </Button>
            </div>
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <div className='flex items-center justify-center w-full h-[80vh] gap-2 flex-col flex-grow'>
        <i className='fa-solid fa-user-large-slash text-4xl'></i>
        <span className='text-dark dark:text-light text-lg font-semibold'>Bạn đã chặn người dùng này</span>
        <Button onClick={handleBlockingUser} className='py-2 px-6 mt-5' rounded='rounded-md'>
          Un Block
        </Button>
      </div>
    </>
  )
}

export default Profile
