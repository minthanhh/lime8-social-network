import { AdvancedVideo, lazyload } from '@cloudinary/react'
import { cld } from 'src/services/cloudinary/clodinary'

const VideoExplore = () => {
  return (
    <div className='w-full h-full flex'>
      <div className='h-full rounded-xl overflow-hidden'>
        <AdvancedVideo
          style={{ height: '100%', width: '100%' }}
          controls
          loop
          muted
          cldVid={cld.video('videos/vqv1yhjoa6o1ttiyslw8')}
          plugins={[lazyload()]}
        />
      </div>
    </div>
  )
}

export default VideoExplore
