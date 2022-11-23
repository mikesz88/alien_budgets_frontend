import Routes from '../../../common/routes';

const dashboardIcons = [
  {
    title: 'My Classes',
    type: 'primary',
    link: Routes.teacherClasses,
    linkId: true,
  },
  {
    title: 'Create a Class',
    type: 'default',
    link: Routes.createClass,
    linkId: false,
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
