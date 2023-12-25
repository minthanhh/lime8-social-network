import { RootState } from 'src/store'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import ListPostSkeleton from './skeletons/ListPostSkeleton'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import socketService from 'src/services/socket/socket.service'
import InfiniteScroll from './InfiniteScroll'
import postService from 'src/services/api/post/post.service'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import { updateUserProfile } from 'src/store/slices/user/user.slice'
import Post from './Post/Post'

interface PostListProps {
  sortType: string
  allPosts?: any[]
}

function sortList(list: any[], sortType: string) {
  if (sortType === 'time') {
    return [...list].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  return list
}

const PostList = ({ sortType, allPosts }: PostListProps) => {
  const { isLoading, posts } = useAppSelector((state: RootState) => state.allPost)
  const profile = useAppSelector((state: RootState) => state.user.profile)
  const [postList, setPostList] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(2)
  const [pageSize, setPageSize] = useState(0)
  const dispatch = useAppDispatch()

  const handleCheckPrivacy = (profile: any, post: any) => {
    const isPrivate = post?.privacy === 'private' && post?.userId === profile?._id
    const isPublic = post?.privacy === 'public'
    return isPrivate || isPublic
  }

  const socketIOPost = (statePosts: any[], setStatePosts: any, sortType: string) => {
    statePosts = cloneDeep(statePosts)
    socketService.socket?.on('add post', (post: any) => {
      console.log(post)
      statePosts = [post, ...statePosts]
      setStatePosts(sortList(statePosts, sortType))

      if (post.userId === profile?._id) {
        dispatch(updateUserProfile({ postsCount: statePosts.filter(({ userId }) => userId === profile?._id).length }))
      }
    })
  }

  useEffect(() => {
    socketService.socket?.on('update post', (data: any) => {
      setPostList(sortList([data, ...postList.filter((post) => post._id !== data._id)], sortType))
    })
  }, [postList, sortType])

  useEffect(() => {
    socketService.socket?.on('delete post', (postId: string) => {
      dispatch(updateUserProfile({ postsCount: postList.filter((post) => post._id !== postId).length }))
      setPostList(
        sortList(
          postList.filter((post) => post._id !== postId),
          sortType
        )
      )
    })
  }, [sortType, postList, dispatch])

  useEffect(() => {
    if (allPosts) {
      setPostList(sortList(allPosts, sortType))
    } else {
      setPostList(sortList(posts, sortType))
    }
  }, [posts, sortType, allPosts])

  useEffect(() => {
    socketIOPost(postList, setPostList, sortType)
  }, [postList, sortType])

  const getAllPost = async () => {
    try {
      const res = await postService.getAllPost(currentPage)
      if (res.data.posts.length > 0) {
        setPostList([...postList, ...res.data.posts])
        setCurrentPage(currentPage + 1)
        setPageSize(postList.length + res.data.posts.length)
      } else {
        setHasMore(false)
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  if (isLoading) {
    return <ListPostSkeleton />
  }

  if (postList.length > 0) {
    return (
      <InfiniteScroll
        currentPage={currentPage}
        pageSize={pageSize}
        next={getAllPost}
        itemsLength={postList.length}
        hasMore={hasMore}
        loader={<ListPostSkeleton />}
        endMessage={
          <AnimatePresence>
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className='bg-light dark:bg-dark rounded-full w-full py-1 shadow text-center font-medium'
            >
              No more posts
            </motion.div>
          </AnimatePresence>
        }
      >
        {postList.map((post, index) => {
          if (profile?.blockedBy.includes(post.userId)) return null
          return (
            handleCheckPrivacy(profile, post) && (
              <Post
                listPost={postList}
                key={index}
                userId={post.userId}
                postId={post._id}
                bgColor={post.bgColor}
                post={post.post}
                imagePost={post.imagePost}
                currentPost={post}
                username={post.username}
                profilePicture={post.profilePicture}
                imgVersion={post.imgVersion}
                imgId={post.imgId}
                videoId={post.videoId}
                videoVersion={post.videoVersion}
              />
            )
          )
        })}
      </InfiniteScroll>
    )
  }

  return <div className='basis-1 w-full bg-light dark:bg-dark rounded-md text-center py-6'>There are no posts yet</div>
}

export default PostList
