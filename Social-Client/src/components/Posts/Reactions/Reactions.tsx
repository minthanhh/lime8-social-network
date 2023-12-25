import { reactionsMap } from 'src/services/utilities/static.data'
import { motion } from 'framer-motion'

const ReactionList = ['like', 'love', 'wow', 'happy', 'sad', 'angry']
const TransitionDelayList = [0, 0.15, 0.2, 0.25, 0.3, 0.35]

interface ReactionsProps {
  onClick: (value: string, previousReaction: string) => void
  reactions: any[]
  usernameReaction: string
}

const Reactions = ({ onClick, reactions, usernameReaction }: ReactionsProps) => {
  const previousReaction = reactions.find(({ username }) => username === usernameReaction)

  return (
    <div className='flex items-center'>
      {ReactionList.map((reaction, idx) => (
        <motion.button
          key={idx}
          initial={{ y: 50, scale: 1.6 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ delay: TransitionDelayList[idx] }}
          className='cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-400/20 rounded-full outline-none'
          onClick={() => onClick(reaction, previousReaction?.type)}
        >
          <motion.img
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, bounce: true }}
            className='object-cover w-12 h-12'
            src={reactionsMap[reaction]}
            alt=''
          />
        </motion.button>
      ))}
    </div>
  )
}

export default Reactions
