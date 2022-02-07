import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMSBRANCH: NbMenuItem[] = [
  {
    title: 'Start -',
    icon: 'home-outline',
    link: '/dashboard',
    hidden: true,
    home:true
  },
  {
    title: 'Main',
    group: true,
  },
    {
    title: 'Dashboards',
    icon: 'bar-chart-outline',
    link: 'graphs'
  },
      {
    title: 'My videos',
    icon: 'video-outline',
    link: 'media'
  },
        {
    title: 'My analytics',
    icon: 'radio-button-on-outline',
    link: 'camerasList'
  },
  // {
  //   title: 'Stored Videos',
  //   icon: 'film-outline',
  //   children: [
  //     {
  //       title: 'Video List',
  //       link: 'search/list',
  //     },
  //     {
  //       title: 'Add Video',
  //       link: 'search/upload',
  //     },
  //     {
  //       title: 'Forensic Search',
  //       link: 'search/bar',
  //     }
  //   ],
  // },
  {
    title: 'Addons',
    group: true,
  },
    {
      title: 'Forensic Search',
      link: 'search/bar',
      icon: 'film-outline',
    },
    {
    title: 'Tickets',
    icon: 'done-all-outline',
    link: 'tickets'
  },
    {
    title: 'Settings',
    group: true,
  },
    {
    title: 'Accounts',
    icon: 'people-outline',
    link: 'accounts'
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    link: 'accounts'
  },
  {
    title: 'Contact us',
    group: true,
  },
    {
    title: 'Feedback / Get support',
    icon: 'email-outline',
    link: 'accounts'
  }
];
export const MENU_ITEMSADMIN: NbMenuItem[] = [
  {
    title: 'Start',
    icon: 'home-outline',
    link: '/dashboard',
    hidden: true,
    home:true
  },
  {
    title: 'Features for Admin',
    group: true,
  },
  {
    title: 'Accounts',
    icon: 'people-outline',
    link: 'accounts'
  }
];

export const MENU_ITEMSCLIENT: NbMenuItem[] = [
  {
    title: 'Start',
    icon: 'home-outline',
    link: '/dashboard',
    hidden: true,
    home:true
  },
  {
    title: 'Features for Client',
    group: true,
  },
  {
    title: 'Accounts',
    icon: 'people-outline',
    link: 'accounts'
  },
  {
    title: 'Reports',
    icon: 'bar-chart-outline',
    link: 'graphs'
  },
  {
    title: 'Tickets',
    icon: 'done-all-outline',
    link: 'tickets'
  },
  {
    title: 'Stored Videos',
    icon: 'film-outline',
    children: [
      {
        title: 'Video List',
        link: 'search/list',
      },
      {
        title: 'Add Video',
        link: 'search/upload',
      },
      {
        title: 'Forensic Search',
        link: 'search/bar',
      }
    ],
  },
];

export const MENU_ITEMSUSER: NbMenuItem[] = [
  {
    title: 'Start',
    icon: 'home-outline',
    link: '/dashboard',
    hidden: true,
    home:true
  },
  {
    title: 'Features for User',
    group: true,
  },
  {
    title: 'Cameras',
    icon: 'video-outline',
    children: [
      {
        title: 'Cameras List',
        link: 'camerasList',
        home: true,
      }
    ],
  },
  {
    title: 'Dashboards',
    icon: 'bar-chart-outline',
    link: 'graphs'
  },
  {
    title: 'Tickets',
    icon: 'done-all-outline',
    link: 'tickets'
  },
];
