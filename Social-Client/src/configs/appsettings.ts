import Icons from 'src/assets/icons'

const AppSettings = {
  NavigationStyles: {
    Active: 'flex items-center justify-center py-4',
    UnActive: 'flex items-center justify-center py-4'
  },
  NavigationFriendsStyles: {
    Active: 'flex items-center text-dark style-main text-sm font-medium gap-4',
    UnActive: 'flex items-center text-dark text-sm font-medium gap-4'
  },
  Routes: [
    {
      pathname: '/home/feeds',
      icon: Icons.Navigations.Home,
      label: 'Feeds'
    },
    {
      pathname: '/chat',
      icon: Icons.Navigations.Message,
      label: 'Messages'
    },
    {
      pathname: '/explore',
      icon: Icons.Navigations.Explore,
      label: 'Explore'
    },
    {
      pathname: '/friends',
      icon: Icons.Navigations.Community,
      label: 'Community'
    }
  ],
  RoutesProfile: [
    {
      pathname: '',
      icon: Icons.NavigationFriends.Friends,
      label: 'Posts'
    },
    {
      pathname: 'about',
      icon: Icons.NavigationFriends.Friends,
      label: 'About'
    },
    {
      pathname: 'friends',
      icon: Icons.NavigationFriends.Friends,
      label: 'Followers'
    },
    {
      pathname: 'resources',
      icon: Icons.NavigationFriends.Friends,
      label: 'Resources'
    }
  ],
  RoutesAbout: [
    {
      pathname: 'about',
      label: 'Overview'
    }
  ],
  RoutesProfileFriends: [
    {
      pathname: 'followers-all',
      label: 'Overview'
    },
    {
      pathname: 'following',
      label: 'Following'
    }
  ]
}

export default AppSettings
