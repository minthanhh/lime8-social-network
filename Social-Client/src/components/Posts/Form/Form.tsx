import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import ToggleBackground from '../ToggleBackground/ToggleBackground'
import InputFile from '../InputFile/InputFile'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
import { updateEditModal } from 'src/store/slices/modal/modal.slice'
import { updatePostItem } from 'src/store/slices/post/post.slice'

interface FormProps {
  onChangeContent: (content: string) => void
  content: string
}

const Form = ({ onChangeContent, content }: FormProps) => {
  const contentEditableRef = useRef<HTMLDivElement | null>(null)
  const [toggleBackground, setToggleBackground] = useState(false)
  const [placeholder, setPlaceholder] = useState<string>('Nhập nội dung ở đây...')
  const dispatch = useAppDispatch()
  const valuesPostEdit = useAppSelector((state) => state.postEdit)
  const editModalIsOpen = useAppSelector((state) => state.modal.editModalIsOpen)
  const inputFileIsOpen = useAppSelector((state: RootState) => state.modal.inputFileIsOpen)
  const bgColor = useAppSelector((state: RootState) => state.post.bgColor)

  useEffect(() => {
    if (valuesPostEdit.imagePost && valuesPostEdit.imgVersion && valuesPostEdit.imgId) {
      dispatch(updateEditModal({ inputFileIsOpen: true }))
    }

    if (valuesPostEdit.bgColor !== '') {
      dispatch(updateEditModal({ backgroundIsOpen: true }))
      setToggleBackground(true)
    }
  }, [valuesPostEdit, dispatch])

  useEffect(() => {
    if (!editModalIsOpen) {
      setToggleBackground(false)
    }
  }, [editModalIsOpen])

  useEffect(() => {
    if (!inputFileIsOpen) {
      dispatch(updatePostItem({ imagePost: '', videoPost: '' }))
    }
  }, [inputFileIsOpen, dispatch])

  const handleChangeContent = (e: ContentEditableEvent) => {
    const text = e.target.value
    if (text.length > 50) {
      contentEditableRef.current!.style.fontSize = '12px'
    } else {
      contentEditableRef.current!.style.fontSize = '16px'
    }

    onChangeContent(text)
  }
  const handleFocus = () => {
    setPlaceholder('')
  }
  const handleBlur = () => {
    if (!content.trim()) {
      setPlaceholder('Nhập nội dung ở đây...')
    }
  }

  return (
    <motion.div
      animate={bgColor && { scale: [1, 1.02, 1] }}
      transition={{ ease: 'easeOut', bounce: 0.25 }}
      className={`rounded-md flex flex-col ${valuesPostEdit.bgColor || bgColor} ${
        valuesPostEdit.bgColor || bgColor
          ? 'min-h-[350px]'
          : (!valuesPostEdit.bgColor || !bgColor) && inputFileIsOpen
          ? 'h-[300px]'
          : 'h-52'
      }`}
    >
      <ContentEditable
        html={content || placeholder}
        onBlur={handleBlur}
        onFocus={handleFocus}
        innerRef={contentEditableRef}
        onChange={handleChangeContent}
        className={`p-2 outline-none text-dark dark:text-light overflow-y-scroll h-auto ${
          (valuesPostEdit.bgColor || bgColor) && 'text-light text-center my-auto max-h-[302px] overflow-x-hidden'
        }`}
      />

      {inputFileIsOpen && <InputFile />}
      {!inputFileIsOpen && <ToggleBackground isToggle={toggleBackground} onToggleBackground={setToggleBackground} />}
    </motion.div>
  )
}

export default Form
