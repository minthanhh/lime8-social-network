import { useRoutes } from 'react-router-dom'
import { Feeds, Friends } from 'src/pages/App'
import Explore from 'src/pages/App/Explore/Explore'
// import Message from 'src/pages/App/Messages/Message'
// import SingleChatBox from 'src/pages/App/Messages/SingleChatBox'
import Profile from 'src/pages/App/Profile/Profile'
import { AuthTabs, ForgotPassword, ResetPassword } from 'src/pages/Auth'
import { LayoutMain, LayoutMessage } from 'src/pages/Layouts'
import { Chat } from 'src/pages/App'
import LayoutChildren from 'src/pages/Layouts/LayoutChildren'

// Pages child profile
import { About, Friend, Resource, Post } from 'src/pages/App/Profile'

// Pages child about
import { Overview } from 'src/pages/App/Profile/Abouts'
import { PhotoResource, VideoResource } from 'src/pages/App/Profile/Resources'
import ProtectedRoutes from 'src/pages/ProtectedRoutes'
import LayoutMobile from 'src/pages/Layouts/LayoutMobile'
import NotFound from 'src/pages/Error/NotFound'
import VideoExplore from 'src/pages/App/Explore/VideoExplore'
import Test from 'src/test'
import { lazy } from 'react'

const LazyFeeds = lazy(() => import('../pages/App/Feeds/Feeds'))

export default function AppRoutes() {
  const elements = useRoutes([
    {
      path: '/',
      element: <AuthTabs />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      element: <LayoutMobile />,
      children: [
        {
          path: '/home',
          element: (
            <ProtectedRoutes>
              <LayoutMain />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: 'feeds',
              element: <LazyFeeds />
            }
          ]
        },
        {
          path: '',
          element: (
            <ProtectedRoutes>
              <LayoutMessage />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: 'chat',
              element: <Chat />
            },
            {
              path: '',
              element: <LayoutChildren />,
              children: [
                {
                  path: 'explore',
                  element: <Explore />
                },
                {
                  path: 'explore/:id',
                  element: <VideoExplore />
                },
                {
                  path: 'friends',
                  element: <Friends />
                },
                {
                  path: 'profile/:userId',
                  element: <Profile />,
                  children: [
                    {
                      path: '',
                      element: <Post />
                    },
                    {
                      path: '',
                      element: <About />,
                      children: [
                        {
                          path: 'about',
                          element: <Overview />
                        }
                      ]
                    },
                    {
                      path: 'friends',
                      element: <Friend />
                    },
                    {
                      path: 'resources',
                      element: <Resource />,
                      children: [
                        {
                          path: '',
                          element: <PhotoResource />
                        },
                        {
                          path: 'resources-video',
                          element: <VideoResource />
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/test',
      element: <Test />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return elements
}
