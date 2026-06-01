import { react2angular } from 'react2angular';
import AmChartsPage from './AmChartsPage';
import ChartJsPage from './ChartJsPage';
import ChartistPage from './ChartistPage';
import MorrisPage from './MorrisPage';

angular.module('BlurAdmin.pages.charts.amCharts')
  .component('amChartsPage', react2angular(AmChartsPage, []));

angular.module('BlurAdmin.pages.charts.chartJs')
  .component('chartJsPage', react2angular(ChartJsPage, []));

angular.module('BlurAdmin.pages.charts.chartist')
  .component('chartistPage', react2angular(ChartistPage, []));

angular.module('BlurAdmin.pages.charts.morris')
  .component('morrisPage', react2angular(MorrisPage, []));
