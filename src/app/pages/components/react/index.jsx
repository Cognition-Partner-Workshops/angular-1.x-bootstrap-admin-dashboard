import { react2angular } from 'react2angular';
import MailPage from './MailPage';
import TimelinePage from './TimelinePage';
import TreePage from './TreePage';

angular.module('BlurAdmin.pages.components.mail')
  .component('reactMailPage', react2angular(MailPage, []));

angular.module('BlurAdmin.pages.components.timeline')
  .component('reactTimelinePage', react2angular(TimelinePage, []));

angular.module('BlurAdmin.pages.components.tree')
  .component('reactTreePage', react2angular(TreePage, []));
