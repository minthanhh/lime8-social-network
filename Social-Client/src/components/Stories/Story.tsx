import clsx from 'clsx'

export type AvatarSizes = 'sm' | 'lg' | 'md'

const avatarSizes: Record<AvatarSizes, string> = {
  md: '',
  lg: 'lg:w-20 lg:h-20 md:w-14 md:h-14 w-[53px] h-[53px]',
  sm: 'w-12 h-12'
}

export interface StoryProps {
  avatar?: string
  justPostNow?: boolean
  username?: string
  size?: AvatarSizes
  children?: React.ReactNode
  className?: string
}

const Story = ({ avatar, username, size = 'sm', justPostNow, children, className }: StoryProps) => {
  return (
    <div className='flex flex-col items-center gap-2 shrink-0'>
      <div
        className={clsx(
          'rounded-full border-4 border-slate-300 dark:border-slate-400/10',
          avatarSizes[size],
          justPostNow ? 'border-just-posted-story border-transparent' : '',
          className ? 'flex items-center justify-center border-2 ' : ''
        )}
      >
        <div
          className={`rounded-full overflow-hidden relative border-2 border-light dark:border-dark -m-[2px] ${
            className ? className : 'pt-[100%]'
          }`}
        >
          {children ? children : <img src={avatar} className='absolute w-full h-full object-cover inset-0' alt='' />}
        </div>
      </div>

      <h3 className='font-semibold text-xs '>{username}</h3>
    </div>
  )
}

export default Story
