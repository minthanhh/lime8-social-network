import Picker from 'emoji-picker-react'

export default function Emoij({ onEmojiClick, width, height }: any) {
  return (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        // native={true}
        // groupNames={{ smileys_people: 'PEOPLE' }}
        width={width}
        height={height}
      />
    </div>
  )
}
