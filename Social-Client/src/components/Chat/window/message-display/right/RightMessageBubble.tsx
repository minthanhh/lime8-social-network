const RightMessageBubble = ({ chat, showImageModel, setImageUrl, setShowImageModel }: any) => {
  return (
    <>
      {chat?.selectedImage && (
        <img
          aria-hidden='true'
          className='object-cover w-full max-w-[200px]'
          src={chat?.selectedImage}
          alt=''
          onClick={() => {
            setImageUrl(chat?.selectedImage)
            setShowImageModel(!showImageModel)
          }}
        />
      )}
      {chat?.gifUrl && (
        <div className='message-gif max-w-[430px]'>
          <img
            aria-hidden='true'
            className='object-cover w-full'
            src={chat?.gifUrl}
            onClick={() => {
              setImageUrl(chat?.gifUrl)
              setShowImageModel(!showImageModel)
            }}
            alt=''
          />
        </div>
      )}
      {chat?.content !== 'Gửi 1 ảnh động' && chat?.content !== 'Gửi 1 ảnh' && (
        <div className='text-md p-1'>{chat?.content}</div>
      )}
    </>
  )
}

export default RightMessageBubble
