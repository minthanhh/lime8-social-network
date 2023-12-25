const StoryListSkeleton = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
    <div key={num} className='flex animate-pulse flex-col items-center gap-2 shrink-0'>
      <div className='w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
      <div className='h-3 mt-1 w-16 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
    </div>
  ))
}

export default StoryListSkeleton
