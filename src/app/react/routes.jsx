import React from 'react';
import { FormInputsPage } from './pages/FormInputsPage';
import { FormLayoutsPage } from './pages/FormLayoutsPage';
import { FormWizardPage } from './pages/FormWizardPage';

export var formRoutes = {
  '/form/inputs': FormInputsPage,
  '/form/layouts': FormLayoutsPage,
  '/form/wizard': FormWizardPage
};
