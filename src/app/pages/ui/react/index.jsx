import { react2angular } from 'react2angular';
import Typography from './Typography';
import Buttons from './Buttons';
import Icons from './Icons';
import Modals from './Modals';
import Grid from './Grid';
import Alerts from './Alerts';
import ProgressBars from './ProgressBars';
import Notifications from './Notifications';
import Tabs from './Tabs';
import Slider from './Slider';
import PanelsPage from './PanelsPage';

angular.module('BlurAdmin.pages.ui.typography')
  .component('uiTypography', react2angular(Typography, []));

angular.module('BlurAdmin.pages.ui.buttons')
  .component('uiButtons', react2angular(Buttons, []));

angular.module('BlurAdmin.pages.ui.icons')
  .component('uiIcons', react2angular(Icons, []));

angular.module('BlurAdmin.pages.ui.modals')
  .component('uiModals', react2angular(Modals, []));

angular.module('BlurAdmin.pages.ui.grid')
  .component('uiGrid', react2angular(Grid, []));

angular.module('BlurAdmin.pages.ui.alerts')
  .component('uiAlerts', react2angular(Alerts, []));

angular.module('BlurAdmin.pages.ui.progressBars')
  .component('uiProgressBars', react2angular(ProgressBars, []));

angular.module('BlurAdmin.pages.ui.notifications')
  .component('uiNotifications', react2angular(Notifications, []));

angular.module('BlurAdmin.pages.ui.tabs')
  .component('uiTabs', react2angular(Tabs, []));

angular.module('BlurAdmin.pages.ui.slider')
  .component('uiSlider', react2angular(Slider, []));

angular.module('BlurAdmin.pages.ui.panels')
  .component('uiPanels', react2angular(PanelsPage, []));
