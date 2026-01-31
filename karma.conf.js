module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-software-rasterizer',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--headless',
          '--disable-extensions'
        ]
      }
    },
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'bower_components/angular-smart-table/dist/smart-table.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/angular-slimscroll/angular-slimscroll.js',
      'bower_components/ng-js-tree/dist/ngJsTree.js',
      'bower_components/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'src/app/theme/theme.module.js',
      'src/app/theme/theme.constants.js',
      'src/app/theme/theme.configProvider.js',
      'src/app/theme/theme.config.js',
      'src/app/theme/theme.run.js',
      'src/app/theme/theme.service.js',
      'src/app/theme/components/components.module.js',
      'src/app/theme/components/**/*.js',
      'src/app/theme/directives/**/*.js',
      'src/app/theme/filters/**/*.js',
      'src/app/theme/inputs/**/*.js',
      'src/app/theme/services/**/*.js',
      'src/app/pages/pages.module.js',
      'src/app/pages/**/*.module.js',
      'src/app/pages/**/*.js',
      'src/app/app.js',
      'src/app/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    singleRun: false,
    concurrency: Infinity
  });
};
