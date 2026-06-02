import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function WizardStep({ children, visible }) {
  return React.createElement('section', {
    className: 'step',
    style: visible ? {} : { display: 'none' }
  }, children);
}

export function FormWizardPage() {
  var tabNumState = useState(0);
  var tabNum = tabNumState[0];
  var setTabNum = tabNumState[1];

  var personalState = useState({ username: '', email: '', password: '', confirmPassword: '' });
  var personal = personalState[0];
  var setPersonal = personalState[1];

  var productState = useState({ productName: '', productId: '' });
  var product = productState[0];
  var setProduct = productState[1];

  var shipmentState = useState({ address: '' });
  var shipment = shipmentState[0];
  var setShipment = shipmentState[1];

  var submittedState = useState([false, false, false, false]);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];

  var steps = ['Personal info', 'Product Info', 'Shipment', 'Finish'];
  var totalSteps = steps.length;
  var progress = ((tabNum + 1) / totalSteps) * 100;

  var containerRef = useRef(null);

  useEffect(function () {
    if (!containerRef.current || !window.jQuery) return;
    var $ = window.jQuery;
    try {
      $(containerRef.current).find('select.selectpicker').each(function () {
        $(this).selectpicker({ dropupAuto: false, hideDisabled: true });
      });
    } catch (e) { /* selectpicker plugin may not be loaded */ }
  }, []);

  var isStep1Valid = function () {
    return personal.username && personal.email && personal.email.indexOf('@') !== -1 &&
      personal.password && personal.confirmPassword && personal.password === personal.confirmPassword;
  };

  var isStep2Valid = function () {
    return product.productName && product.productId;
  };

  var isStep3Valid = function () {
    return shipment.address;
  };

  var markSubmitted = function (idx) {
    var next = submitted.slice();
    next[idx] = true;
    setSubmitted(next);
  };

  var selectTab = useCallback(function (idx) {
    if (idx < 0 || idx >= totalSteps) return;
    markSubmitted(tabNum);
    if (idx > tabNum) {
      for (var step = tabNum; step < idx; step++) {
        if (step === 0 && !isStep1Valid()) return;
        if (step === 1 && !isStep2Valid()) return;
        if (step === 2 && !isStep3Valid()) return;
      }
    }
    setTabNum(idx);
  }, [tabNum, personal, product, shipment, submitted]);

  var onPersonalChange = useCallback(function (field) {
    return function (e) {
      var val = e.target.value;
      setPersonal(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }, []);

  var onProductChange = useCallback(function (field) {
    return function (e) {
      var val = e.target.value;
      setProduct(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }, []);

  var onShipmentChange = useCallback(function (field) {
    return function (e) {
      var val = e.target.value;
      setShipment(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }, []);

  var usernameInvalid = !personal.username && submitted[0];
  var emailInvalid = (!personal.email || personal.email.indexOf('@') === -1) && submitted[0];
  var passwordInvalid = !personal.password && submitted[0];
  var confirmInvalid = personal.password !== personal.confirmPassword && submitted[0];
  var productNameInvalid = !product.productName && submitted[1];
  var productIdInvalid = !product.productId && submitted[1];
  var addressInvalid = !shipment.address && submitted[2];

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Form Wizard', panelClass: 'with-scroll', baPanelTitle: 'Form Wizard' },
          React.createElement('div', { className: 'ba-wizard', ref: containerRef },
            React.createElement('div', { className: 'ba-wizard-navigation-container' },
              steps.map(function (title, i) {
                return React.createElement('div', {
                  key: i,
                  className: 'ba-wizard-navigation' + (tabNum === i ? ' active' : ''),
                  onClick: function () { selectTab(i); }
                }, title);
              })
            ),
            React.createElement('div', { className: 'progress ba-wizard-progress' },
              React.createElement('div', {
                className: 'progress-bar progress-bar-danger active',
                role: 'progressbar',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
                style: { width: progress + '%' }
              })
            ),
            React.createElement('div', { className: 'steps' },
              /* Step 1: Personal Info */
              React.createElement(WizardStep, { visible: tabNum === 0 },
                React.createElement('form', { name: 'personalInfoForm', noValidate: true },
                  React.createElement('div', { className: 'row' },
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group has-feedback' + (usernameInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'exampleUsername1' }, 'Username'),
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'exampleUsername1', name: 'username', placeholder: 'Username', value: personal.username, onChange: onPersonalChange('username'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                      ),
                      React.createElement('div', { className: 'form-group' + (emailInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
                        React.createElement('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail1', name: 'email', placeholder: 'Email', value: personal.email, onChange: onPersonalChange('email'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Proper email required')
                      )
                    ),
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group' + (passwordInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'exampleInputPassword1', name: 'password', placeholder: 'Password', value: personal.password, onChange: onPersonalChange('password'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                      ),
                      React.createElement('div', { className: 'form-group' + (confirmInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'exampleInputConfirmPassword1' }, 'Confirm Password'),
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'exampleInputConfirmPassword1', name: 'confirmPassword', placeholder: 'Confirm Password', value: personal.confirmPassword, onChange: onPersonalChange('confirmPassword'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Passwords should match')
                      )
                    )
                  )
                )
              ),
              /* Step 2: Product Info */
              React.createElement(WizardStep, { visible: tabNum === 1 },
                React.createElement('form', { name: 'productInfoForm', noValidate: true },
                  React.createElement('div', { className: 'row' },
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group has-feedback' + (productNameInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'productName' }, 'Product name'),
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'productName', name: 'productName', placeholder: 'Product name', value: product.productName, onChange: onProductChange('productName'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                      ),
                      React.createElement('div', { className: 'form-group' + (productIdInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'productId' }, 'Product id'),
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'productId', name: 'productId', placeholder: 'productId', value: product.productId, onChange: onProductChange('productId'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                      )
                    ),
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'productName' }, 'Category'),
                        React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Category', defaultValue: 'Electronics' },
                          React.createElement('option', null, 'Electronics'),
                          React.createElement('option', null, 'Toys'),
                          React.createElement('option', null, 'Accessories')
                        )
                      )
                    )
                  )
                )
              ),
              /* Step 3: Shipment */
              React.createElement(WizardStep, { visible: tabNum === 2 },
                React.createElement('form', { name: 'addressForm', noValidate: true },
                  React.createElement('div', { className: 'row' },
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group has-feedback' + (addressInvalid ? ' has-error' : '') },
                        React.createElement('label', { htmlFor: 'productName' }, 'Shipment address'),
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'address', name: 'address', placeholder: 'Shipment address', value: shipment.address, onChange: onShipmentChange('address'), required: true }),
                        React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                      )
                    ),
                    React.createElement('div', { className: 'col-md-6' },
                      React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'productName' }, 'Shipment method'),
                        React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Category', defaultValue: 'Fast & expensive' },
                          React.createElement('option', null, 'Fast & expensive'),
                          React.createElement('option', null, 'Cheap & free')
                        )
                      )
                    )
                  ),
                  React.createElement('div', { className: 'checkbox' },
                    React.createElement('label', { className: 'custom-checkbox' },
                      React.createElement('input', { type: 'checkbox' }),
                      React.createElement('span', null, 'Save shipment info')
                    )
                  )
                )
              ),
              /* Step 4: Finish */
              React.createElement(WizardStep, { visible: tabNum === 3 },
                React.createElement('form', { className: 'form-horizontal', name: 'finishForm', noValidate: true },
                  'Congratulations! You have successfully filled the form!'
                )
              )
            ),
            React.createElement('nav', null,
              React.createElement('ul', { className: 'pager ba-wizard-pager' },
                React.createElement('li', { className: 'previous' },
                  React.createElement('button', {
                    disabled: tabNum === 0,
                    onClick: function () { selectTab(tabNum - 1); },
                    type: 'button',
                    className: 'btn btn-primary'
                  }, React.createElement('span', { 'aria-hidden': 'true' }, '\u2190'), ' previous')
                ),
                React.createElement('li', { className: 'next' },
                  React.createElement('button', {
                    disabled: tabNum === totalSteps - 1,
                    onClick: function () { selectTab(tabNum + 1); },
                    type: 'button',
                    className: 'btn btn-primary'
                  }, 'next ', React.createElement('span', { 'aria-hidden': 'true' }, '\u2192'))
                )
              )
            )
          )
        )
      )
    )
  );
}
