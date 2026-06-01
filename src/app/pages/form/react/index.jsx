import { react2angular } from 'react2angular';
var FormInputs = require('./FormInputs');
var FormLayouts = require('./FormLayouts');
var FormWizard = require('./FormWizard');

angular.module('BlurAdmin.pages.form')
  .component('reactFormInputs', react2angular(FormInputs, []))
  .component('reactFormLayouts', react2angular(FormLayouts, []))
  .component('reactFormWizard', react2angular(FormWizard, []));
