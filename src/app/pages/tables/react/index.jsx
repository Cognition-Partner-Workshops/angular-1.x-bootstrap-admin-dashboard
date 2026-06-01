import React from 'react';
import ReactDOM from 'react-dom';
import { react2angular } from 'react2angular';
import BasicTables from './BasicTables';
import SmartTables from './SmartTables';

angular.module('BlurAdmin.pages.tables')
  .component('basicTablesReact', react2angular(BasicTables, []))
  .component('smartTablesReact', react2angular(SmartTables, []));
