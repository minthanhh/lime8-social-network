import AddFrendsSvg from './components/friends/AddFriendSvg'
import AllFriendsSvg from './components/friends/AllFriendsSvg'
import CakeSvg from './components/friends/CakeSvg'
import KeepSvg from './components/friends/KeepSvg'
import FriendsSvg from './components/friends/FriendsSvg'

import CommunitySvg from './components/navigations/ComunitySvg'
import ExploreSvg from './components/navigations/ExploreSvg'
import HomeSvg from './components/navigations/HomeSvg'
import MessageSvg from './components/navigations/MessageSvg'
import ToptvSvg from './components/navigations/ToptvSvg'

import Privacy from './components/privacy'
import Post from './components/posts'

const Icons = {
  Navigations: {
    Home: HomeSvg,
    Explore: ExploreSvg,
    TopTv: ToptvSvg,
    Message: MessageSvg,
    Community: CommunitySvg
  },
  NavigationFriends: {
    AddFriend: AddFrendsSvg,
    Cake: CakeSvg,
    AllFriends: AllFriendsSvg,
    Keep: KeepSvg,
    Friends: FriendsSvg
  },
  Privacy,
  Post
}

export default Icons
