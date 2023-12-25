import { timeAgo } from 'src/services/utilities/timeago'

const ChatListBody = ({ data, profile }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      <p className='text-sm opacity-90 w-28 whitespace-nowrap overflow-hidden overflow-ellipsis text-dark dark:text-light'>
        {data.content}
      </p>

      {data?.createdAt && (
        <span className='text-[10px] whitespace-nowrap opacity-60 text-dark dark:text-light'>
          {timeAgo.transform(data?.createdAt)}
        </span>
      )}
    </div>
  )
}
export default ChatListBody
