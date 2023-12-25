import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GiphyUtils } from 'src/services/utilities/gif'

const GifBox = ({ handleGiphyClick }: any) => {
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GiphyUtils.getTrendingGifs(setGifs, setLoading)
  }, [])

  return (
    <div className='absolute bottom-16 left-3 rounded-md bg-light shadow dark:bg-dark max-w-[350px] p-3'>
      <label
        htmlFor='gif'
        className='flex items-center bg-inputLight dark:bg-inputDark shadow text-stone-600 px-2 py-1 rounded-md border border-gray-100 dark:border-slate-400/25 mb-2'
      >
        <FaSearch size={20} className='text-dark dark:text-light' />
        <input
          id='gif'
          name='gif'
          type='text'
          className='flex-1 outline-none px-5 h-full bg-transparent text-sm'
          placeholder='tìm kiếm ảnh động'
          onChange={(e) => GiphyUtils.searchGifs(e.target.value, setGifs, setLoading)}
        />
      </label>

      {loading && <div>Loading...</div>}

      {!loading && (
        <div className='overflow-y-auto max-h-[300px] w-full'>
          <div className='columns-3 gap-2'>
            {gifs.map((gif: any, index) => (
              <div
                key={index}
                aria-hidden='true'
                className='w-full h-auto'
                onClick={() => handleGiphyClick(gif.images.original.url)}
              >
                <img
                  className='object-cover mb-2 w-full h-auto rounded-sm'
                  src={`${gif.images.original.url!}`}
                  loading='lazy'
                  alt=''
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GifBox
