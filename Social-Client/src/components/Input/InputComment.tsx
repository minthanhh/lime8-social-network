import { SmileSvg, GallerySvg } from '../icons/posts'
interface InputCommentProps {
  placeholder: string
}

const InputComment = ({ placeholder }: InputCommentProps) => {
  return (
    <div className='flex items-center bg-light-input rounded-full w-full overflow-hidden px-6 py-1'>
      <input type='text' placeholder={placeholder} className='text-input outline-none bg-transparent w-full h-full' />

      <div className='flex items-center gap-1'>
        <SmileSvg width='30' height='30' />
        <GallerySvg width='30' height='30' />
      </div>
    </div>
  )
}

export default InputComment
