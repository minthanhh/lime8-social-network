import { linearGradient } from 'src/mocks/linear-gradient-backgrounds'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { changeBgColor } from 'src/store/slices/post/post.slice'
import { toggleOpenBackground } from 'src/store/slices/modal/modal.slice'
import { updatePostEdit } from 'src/store/slices/post/postEdit.slice'
import useEffectOnce from 'src/hooks/useEffectOnce'

interface ToggleBackgroundProps {
  onToggleBackground: React.Dispatch<React.SetStateAction<boolean>>
  isToggle: boolean
}

export default function ToggleBackground({ onToggleBackground, isToggle }: ToggleBackgroundProps) {
  const [isActive, setIsActive] = useState(-1)
  const dispatch = useAppDispatch()
  const valuesPostEdit = useAppSelector((state) => state.postEdit)
  const editModalIsOpen = useAppSelector((state) => state.modal.editModalIsOpen)
  const mainModalIsOpen = useAppSelector((state) => state.modal.mainModalIsOpen)

  const handleToggleBackground = useCallback(() => {
    onToggleBackground((v) => !v)
    dispatch(toggleOpenBackground())
    dispatch(changeBgColor(''))
    dispatch(updatePostEdit({ bgColor: '' }))
    setIsActive(-1)
  }, [onToggleBackground, dispatch])

  const handleChangeBackground = useCallback(
    (linearColor: string, index: number) => {
      if (editModalIsOpen) {
        if (isActive === index) {
          return
        } else {
          dispatch(updatePostEdit({ bgColor: linearColor }))
          setIsActive(index)
        }
      } else {
        if (isActive === index) {
          return
        } else {
          dispatch(changeBgColor(linearColor))
          setIsActive(index)
        }
      }
    },
    [isActive, dispatch, editModalIsOpen]
  )

  useEffect(() => {
    if (!editModalIsOpen && !mainModalIsOpen) {
      dispatch(toggleOpenBackground())
      setIsActive(-1)
      dispatch(updatePostEdit({ bgColor: '' }))
    }
  }, [editModalIsOpen, dispatch, mainModalIsOpen])

  useEffectOnce(() => {
    if (valuesPostEdit && valuesPostEdit.bgColor) {
      handleChangeBackground(
        valuesPostEdit.bgColor,
        linearGradient.findIndex(({ color }) => color === valuesPostEdit.bgColor)
      )
    }
  })

  return (
    <div className={`flex items-center justify-between p-2 ${linearGradient[isActive] ? 'mt-0' : 'mt-auto'}`}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={handleToggleBackground}
        className={`rounded-md w-8 h-8 shadow-shadowMain ${
          isToggle ? 'bg-[#E3E3E3] text-[#666666]' : 'style-bg-main text-light'
        }`}
      >
        A
      </motion.button>

      {isToggle &&
        linearGradient.map((linearColor, index) => (
          <motion.button
            key={index}
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            exit={{ x: -30, opacity: 0 }}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => handleChangeBackground(linearColor.color, index)}
            className={`rounded-md w-8 h-8 shadow-shadowMain ${linearColor.color} ${
              index === isActive && 'border-2 border-white'
            }`}
          ></motion.button>
        ))}
    </div>
  )
}
