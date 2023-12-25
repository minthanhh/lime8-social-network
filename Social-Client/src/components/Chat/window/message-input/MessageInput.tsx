/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react'
import { Button } from 'src/components'
import IconSvg from 'src/assets/icons/components/messages/IconSvg'
import LinkSvg from 'src/assets/icons/components/messages/LinkSvg'
import { SendSvg } from 'src/components/icons'
import { BsImages } from 'react-icons/bs'
import loadable from '@loadable/component'
import GifBox from '../../gif/Sticker'
import ImagePreview from '../../preview-img/ImagePreview'
import { ImageUtils } from 'src/services/utilities/image.utils'

const EmojiPickerComponent = loadable(() => import('./Emoij'), {
  fallback: <p id='loading'>Loading...</p>
})
interface IMessageInput {
  setChatMessage?: any
}
export default function MessageInput({ setChatMessage }: IMessageInput) {
  // eslint-disable-next-line prefer-const
  let [message, setMessage] = useState('')
  const [showEmojiContainer, setShowEmojiContainer] = useState(false)
  const [showGifContainer, setShowGifContainer] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [base64File, setBase64File] = useState('')
  const messageInputRef = useRef<any>()
  const fileInputRef = useRef<any>()
  const [file, setFile] = useState<any>()
  const addToPreview = async (file: any) => {
    ImageUtils.checkFile(file, 'image')
    setFile(URL.createObjectURL(file))
    const result = await ImageUtils.readFileToBase64(file)
    setBase64File(result)
    setShowImagePreview(!showImagePreview)
    setShowEmojiContainer(false)
    setShowGifContainer(false)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    message = message || 'Gửi 1 ảnh'
    setChatMessage(message.replace(/ +(?= )/g, ''), '', base64File)
    setMessage('')
    reset()
  }
  const handleImageClick = () => {
    message = message || 'Gửi 1 ảnh'
    setChatMessage(message.replace(/ +(?= )/g, ''), '', base64File)
    reset()
  }
  const handleGiphyClick = (url: string) => {
    setChatMessage('Gửi 1 ảnh động', url, '')
    reset()
  }
  const fileInputClicked = () => {
    fileInputRef.current.click()
  }
  const reset = () => {
    setBase64File('')
    setShowImagePreview(false)
    setShowEmojiContainer(false)
    setShowGifContainer(false)
    setFile('')
  }
  useEffect(() => {
    if (messageInputRef?.current) {
      messageInputRef.current.focus()
    }
  }, [setChatMessage])
  return (
    <>
      {showEmojiContainer && (
        <EmojiPickerComponent
          onEmojiClick={(event: any, eventObject: any) => {
            setMessage((text) => (text += ` ${event.emoji}`))
          }}
          width='350px'
          height='350px'
        />
      )}
      {showGifContainer && <GifBox handleGiphyClick={handleGiphyClick} />}
      {showImagePreview && (
        <ImagePreview
          image={file}
          onRemoreImg={() => {
            setFile('')
            setBase64File('')
            setShowImagePreview(!showImagePreview)
          }}
        />
      )}
      <form className='w-full bg-light dark:bg-dark' onSubmit={handleSubmit}>
        <div className='border-t border-gray-200 dark:border-slate-400/25 py-2 flex items-center gap-3 w-full px-2'>
          <label
            htmlFor=''
            aria-hidden='true'
            onClick={() => {
              setShowEmojiContainer(false)
              setShowGifContainer(false)
              fileInputClicked()
            }}
            className='cursor-pointer image text-sky-500'
          >
            <input
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = null
                }
              }}
              onChange={(e) => addToPreview(e.target.files?.[0] as File)}
              ref={fileInputRef}
              name='image'
              id='image'
              type='file'
              hidden
            />
            <BsImages size={22} />
          </label>
          <div
            aria-hidden='true'
            onClick={() => {
              setShowEmojiContainer(false)
              setShowGifContainer(!showGifContainer)
              setShowImagePreview(false)
            }}
            className='cursor-pointer sticker-gif'
          >
            <LinkSvg width='22' height='22' />
          </div>
          <div
            aria-hidden='true'
            className='cursor-pointer emoji'
            onClick={() => {
              setShowEmojiContainer(!showEmojiContainer)
              setShowGifContainer(false)
              setShowImagePreview(false)
            }}
          >
            <IconSvg width='22' height='22' />
          </div>
          <input
            ref={messageInputRef}
            className='border-2 border-gray-200 dark:border-slate-400/25 text-base outline-none bg-inputLight dark:bg-inputDark rounded-2xl py-1 px-3 flex-1 text-stone-700 dark:text-light'
            type='text'
            id='message'
            name='message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder='Aa ...'
          />
          {showImagePreview && !message && (
            <Button className='px-1.5 py-1.5' rounded='rounded-md' onClick={handleImageClick}>
              <SendSvg width='22' height='22' />
            </Button>
          )}
        </div>
      </form>
    </>
  )
}
