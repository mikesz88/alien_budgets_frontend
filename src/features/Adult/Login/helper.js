import Routes from '../../../common/routes';

const loginButtons = [
  {
    larger: 'true',
    type: 'primary',
    htmlType: 'submit',
    buttonText: 'Login',
    Link: false,
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'New Adult',
    Link: Routes.registerAdultPart1,
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Forgot Password? Use Forgot Question',
    Link: Routes.accessByForgotPassword,
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Forgot Password? Find by Email',
    Link: Routes.accessByEmail,
  },
  {
    larger: 'true',
    type: 'primary',
    htmlType: false,
    buttonText: 'Back to Main Page',
    Link: Routes.hero,
  },
];

export default loginButtons;
