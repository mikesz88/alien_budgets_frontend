import Routes from '../../../common/routes';

const dashboardIcons = [
  {
    title: 'My Stats',
    type: 'primary',
    link: Routes.stats,
    linkId: true,
  },
  {
    title: 'Class Leaderboard',
    type: 'default',
    link: Routes.leaderboard,
    linkId: true,
  },
  {
    title: 'Account',
    type: 'default',
    link: Routes.account,
    linkId: false,
  },
  {
    title: 'Logout',
    type: 'primary',
    link: Routes.logout,
    linkId: false,
  },
];

export default dashboardIcons;
