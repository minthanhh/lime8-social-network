const ListPostSkeleton = () => {
  return [1, 2, 3, 4, 5].map((num) => (
    <div key={num} className='w-full animate-pulse shadow-shadowMain bg-light dark:bg-dark rounded-md px-3 py-4 mb-3'>
      <div className='flex flex-col gap-2 md:gap-4'>
        <div className='flex items-center gap-2'>
          <svg
            className='w-[56px] h-[56px] text-gray-200 dark:text-gray-700'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
          </svg>

          <div className='flex flex-col gap-1'>
            <div className='h-4 w-[120px] bg-gray-200 dark:bg-gray-700 rounded-full'></div>
            <div className='h-3 w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full'></div>
          </div>
        </div>

        <div className='rounded-xl md:rounded-md overflow-hidden'>
          <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700 md:h-[400px] object-cover' />
        </div>

        <div className='flex items-center md:justify-between'>
          <div className='flex items-center gap-2'>
            <div className='md:w-8 rounded-md md:h-8 w-6 h-6 bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-3 w-[90px] rounded-md bg-gray-200 dark:bg-gray-700'></div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='md:w-8 rounded-md md:h-8 w-6 h-6 bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-3 w-[90px] rounded-md bg-gray-200 dark:bg-gray-700'></div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='md:w-8 rounded-md md:h-8 w-6 h-6 bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-3 w-[90px] rounded-md bg-gray-200 dark:bg-gray-700'></div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default ListPostSkeleton
