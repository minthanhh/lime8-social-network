import Picker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'

interface EmojiPickerProps {
  onEmojiClick: (e: EmojiClickData) => void
}

const EmojiPicker = ({ onEmojiClick }: EmojiPickerProps) => {
  return <Picker onEmojiClick={onEmojiClick} emojiStyle={EmojiStyle.FACEBOOK} width='300px' height='300px' />
}

export default EmojiPicker
