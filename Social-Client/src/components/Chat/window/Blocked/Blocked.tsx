import { useCallback } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

/**
 * @description User sevices to interact with user context
 */
import userService from 'src/services/api/user/user.service'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { updateUserProfile } from 'src/store/slices/user/user.slice'
import { useTheme } from 'src/hooks/useTheme'

export const swalBlockedOptions = (
  blockedName: string,
  theme: boolean,
  onConditionBlockerUnblocker: () => Promise<void>
): SweetAlertOptions => {
  return {
    text: `Do you want to unblocked ${blockedName}?`,
    title: 'Are you sure?',
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    timerProgressBar: true,
    confirmButtonText: 'Yes',
    allowOutsideClick: false,
    cancelButtonText: 'No',
    preConfirm: async () => {
      Swal.getCancelButton()?.remove()
      onConditionBlockerUnblocker()
    },
    background: theme ? '#FFFFFF' : '#1B1D2A',
    customClass: {
      title: 'question-blocked-title',
      htmlContainer: 'swal-text',
      cancelButton: 'question-blocked-denny-button',
      confirmButton: 'question-blocked-confirm-button'
    }
  }
}

export const swalSuccessOptions = (theme: boolean): SweetAlertOptions => ({
  icon: 'success',
  background: theme ? '#FFFFFF' : '#1B1D2A',
  customClass: {
    htmlContainer: 'swal-text',
    title: 'question-blocked-title',
    confirmButton: 'question-blocked-confirm-button',
    cancelButton: 'question-blocked-denny-button'
  }
})

interface BlockedProps {
  blockedName: string
  blockedId: string
}

const Blocked = ({ blockedName, blockedId }: BlockedProps) => {
  const { chooseTheme } = useTheme()

  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.user.profile)

  const handleUnBlocked = useCallback(async () => {
    const { isConfirmed } = await Swal.fire(
      swalBlockedOptions(blockedName, chooseTheme, async () => {
        await userService.userUnBlockedByAccountOwner(blockedId)
        dispatch(updateUserProfile({ blocked: profile?.blocked.filter((id) => id !== id) }))
      })
    )

    if (!isConfirmed) return

    Swal.fire({
      ...swalSuccessOptions(chooseTheme),
      title: 'Unblocked successfully',
      text: 'You can now send messages'
    })
  }, [blockedName, chooseTheme, blockedId, profile?.blocked, dispatch])

  return (
    <div className='text-dark dark:text-light border-t border-gray-200 dark:border-slate-400/25 px-6 py-3 text-center'>
      <p className='text-sm font-bold'>You have blocked messages from {blockedName}&apos;s Lime8 account</p>
      <p className='text-sm'>Will you not be able to text each other in this chat</p>
      <button
        onClick={handleUnBlocked}
        className='bg-inputLight dark:bg-inputDark rounded-md shadow w-full py-1 font-bold text-base mt-2'
      >
        Un Blocked
      </button>
    </div>
  )
}

export default Blocked
