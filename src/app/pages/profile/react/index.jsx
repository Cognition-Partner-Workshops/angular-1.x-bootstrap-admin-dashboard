import { react2angular } from 'react2angular';
import ProfilePage from './ProfilePage';

angular.module('BlurAdmin.pages.profile')
  .component('profilePageReact', react2angular(ProfilePage, []));
