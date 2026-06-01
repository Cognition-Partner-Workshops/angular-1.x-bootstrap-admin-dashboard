import { react2angular } from 'react2angular';
import Dashboard from './Dashboard';

angular.module('BlurAdmin.pages.dashboard')
  .component('reactDashboard', react2angular(Dashboard, []));
