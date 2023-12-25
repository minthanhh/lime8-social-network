import { ComunitySvg, ExploreSvg, FavoriteSvg, FeedSvg, ToptvSvg } from 'src/components/icons/navbar'

export const Navbars = [
  {
    id: 1,
    icon: FeedSvg,
    value: 'Feeds',
    path: '/home/feeds'
  },
  {
    id: 2,
    icon: ExploreSvg,
    value: 'Explore',
    path: '/home/explore'
  },
  {
    id: 3,
    icon: ToptvSvg,
    value: 'Top Tv',
    path: '/home/top-tv'
  },
  {
    id: 4,
    icon: FavoriteSvg,
    value: 'My Favorites',
    path: '/home/my-favorites'
  },
  {
    id: 5,
    icon: ComunitySvg,
    value: 'Community',
    path: '/home/community'
  }
]
