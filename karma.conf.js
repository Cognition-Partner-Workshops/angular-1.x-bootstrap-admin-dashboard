module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // Vendor libraries (bower)
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'bower_components/angular-smart-table/dist/smart-table.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/angular-slimscroll/angular-slimscroll.js',
      'bower_components/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/angular-ui-select/dist/select.js',
      'bower_components/chart.js/dist/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/chartist/dist/chartist.js',
      'bower_components/angular-chartist.js/dist/angular-chartist.js',
      'bower_components/raphael/raphael.js',
      'bower_components/morris.js/morris.js',
      'bower_components/angular-morris-chart/src/angular-morris-chart.js',
      // textAngular excluded - mocked in test-helpers.js due to rangy UMD issues
      'bower_components/amcharts/dist/amcharts/amcharts.js',
      'bower_components/ammap/dist/ammap/ammap.js',

      // Test helpers (mock modules for hard-to-load dependencies)
      'test/test-helpers.js',

      // App source files
      'src/app/theme/theme.module.js',
      'src/app/theme/theme.constants.js',
      'src/app/theme/theme.configProvider.js',
      'src/app/theme/theme.config.js',
      'src/app/theme/theme.service.js',
      'src/app/theme/theme.run.js',
      'src/app/theme/components/components.module.js',
      'src/app/theme/inputs/inputs.module.js',
      'src/app/theme/filters/**/*.js',
      'src/app/theme/services/**/*.js',
      'src/app/theme/directives/**/*.js',
      'src/app/theme/components/**/*.js',
      'src/app/theme/inputs/**/*.js',
      'src/app/pages/pages.module.js',
      'src/app/pages/**/*.module.js',
      'src/app/pages/**/*.js',
      'src/app/app.js',

      // Test files
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/app/**/*.js': ['coverage']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type: 'text',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
