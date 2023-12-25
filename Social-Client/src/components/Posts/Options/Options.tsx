import Icons from 'src/assets/icons'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { RootState } from 'src/store'

import { toggleOpenFeelingsModal, toggleOpenGifsModal, toggleOpenInputFile } from 'src/store/slices/modal/modal.slice'
import { updatePostItem } from 'src/store/slices/post/post.slice'
import { updatePostEdit } from 'src/store/slices/post/postEdit.slice'

const Options = () => {
  const dispatch = useAppDispatch()
  const backgroundIsOpen = useAppSelector((state: RootState) => state.modal.backgroundIsOpen)
  const inputFileIsOpen = useAppSelector((state: RootState) => state.modal.inputFileIsOpen)

  const checkDisabledOptions = (type?: string) => {
    if (backgroundIsOpen === false && inputFileIsOpen === false) return false

    if (backgroundIsOpen && type === 'bgColor') {
      return true
    }

    if (inputFileIsOpen && type === 'inputFile') {
      return true
    }
  }

  return (
    <div className='border-dark/10 dark:border-light/10 shadow-shadowMain border flex items-center rounded-lg py-4 px-6 justify-between select-none'>
      <p className='text-sm text-dark dark:text-light font-normal'>Thêm vào bài viết</p>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => {
            dispatch(toggleOpenInputFile())
            if (inputFileIsOpen) {
              dispatch(updatePostEdit({ imagePost: '' }))
              dispatch(updatePostItem({ imagePost: '' }))
            }
          }}
          className={`p-1 hover:bg-slate-400/20 transition-all ease-linear duration-150 rounded-md flex items-center gap-1.5 ${
            checkDisabledOptions('bgColor') ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={checkDisabledOptions('bgColor')}
        >
          <Icons.Post.AddImage width='28' height='28' disabled={checkDisabledOptions('bgColor')} />
          <span className='text-[10px] text-dark dark:text-light'>OR</span>
          <Icons.Post.AddVideo width='28' height='28' disabled={checkDisabledOptions('bgColor')} />
        </button>
        <button
          onClick={() => dispatch(toggleOpenFeelingsModal())}
          className={`p-1 hover:bg-slate-400/20 transition-all ease-linear duration-150 rounded-md cursor-pointer`}
          disabled={false}
        >
          <Icons.Post.AddIcons width='28' height='28' disabled={false} />
        </button>
        <button
          onClick={() => dispatch(toggleOpenGifsModal())}
          className={`p-1 hover:bg-slate-400/20 transition-all ease-linear duration-150 rounded-md ${
            checkDisabledOptions(backgroundIsOpen ? 'bgColor' : 'inputFile') ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={checkDisabledOptions(backgroundIsOpen ? 'bgColor' : 'inputFile')}
        >
          <Icons.Post.AddGif
            width='28'
            height='28'
            disabled={checkDisabledOptions(backgroundIsOpen ? 'bgColor' : 'inputFile')}
          />
        </button>
      </div>
    </div>
  )
}

export default Options
