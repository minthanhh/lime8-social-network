/* eslint-disable jsx-a11y/no-static-element-interactions */
import { reactionsMap } from 'src/services/utilities/static.data'

const Reactions = ({ handleClick, showLabel = false }: any) => {
  const reactionList = ['like', 'love', 'wow', 'happy', 'sad', 'angry']
  return (
    <div className='flex items-center justify-center cursor-pointer'>
      {reactionList.map((reaction, index) => (
        <div
          aria-hidden='true'
          key={index}
          className='relative transition duration-200 ease-in-out transform hover:scale-105'
          onClick={() => handleClick(reaction)}
        >
          {showLabel && (
            <label className='absolute top-0 left-1/2 -mt-8 px-2 text-xs bg-black text-white rounded'>{reaction}</label>
          )}
          <img className='w-10 h-10 flex-shrink-0' src={reactionsMap[reaction]} alt='' />
          <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 py-1 px-2 text-xs font-bold rounded invisible'>
            {reaction}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Reactions
