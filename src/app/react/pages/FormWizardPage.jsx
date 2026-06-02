import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Panel } from '../components/Panel';

/* ── Wizard Step Component ───────────────────────────────── */
function WizardStep(props) {
  if (!props.active) return null;
  return React.createElement('section', { className: 'step' }, props.children);
}

/* ── Form Wizard Page ────────────────────────────────────── */
export function FormWizardPage() {
  var _t = useState(0);
  var tabNum = _t[0];
  var setTabNum = _t[1];

  var _pi = useState({ username: '', email: '', password: '', confirmPassword: '' });
  var personalInfo = _pi[0];
  var setPersonalInfo = _pi[1];

  var _pr = useState({ productName: '', productId: '' });
  var productInfo = _pr[0];
  var setProductInfo = _pr[1];

  var _sh = useState({ address: '' });
  var shipment = _sh[0];
  var setShipment = _sh[1];

  var _sub = useState([false, false, false, false]);
  var submitted = _sub[0];
  var setSubmitted = _sub[1];

  var stepsRef = useRef(null);

  var stepTitles = ['Personal info', 'Product Info', 'Shipment', 'Finish'];
  var totalSteps = stepTitles.length;
  var progress = ((tabNum + 1) / totalSteps) * 100;

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !stepsRef.current || !$.fn.selectpicker) return;
    try {
      $(stepsRef.current).find('select.selectpicker').each(function () {
        if (!$(this).data('selectpicker')) {
          $(this).selectpicker({ dropupAuto: false, hideDisabled: true });
        }
      });
    } catch (e) { /* plugin not available */ }
  }, [tabNum]);

  function markSubmitted(idx) {
    setSubmitted(function (prev) {
      var next = prev.slice();
      next[idx] = true;
      return next;
    });
  }

  function isStepValid(idx) {
    if (idx === 0) {
      return personalInfo.username !== '' &&
        personalInfo.email !== '' && personalInfo.email.indexOf('@') !== -1 &&
        personalInfo.password !== '' &&
        personalInfo.confirmPassword !== '' &&
        personalInfo.password === personalInfo.confirmPassword;
    }
    if (idx === 1) {
      return productInfo.productName !== '' && productInfo.productId !== '';
    }
    if (idx === 2) {
      return shipment.address !== '';
    }
    return true;
  }

  function canNavigateTo(idx) {
    for (var i = 0; i < idx; i++) {
      if (!isStepValid(i)) return false;
    }
    return true;
  }

  var selectTab = useCallback(function (idx) {
    markSubmitted(tabNum);
    if (idx >= 0 && idx < totalSteps && canNavigateTo(idx)) {
      setTabNum(idx);
    }
  }, [tabNum, personalInfo, productInfo, shipment]);

  function nextTab() { selectTab(tabNum + 1); }
  function previousTab() { selectTab(tabNum - 1); }

  function handlePersonalInfo(field) {
    return function (e) {
      var val = e.target.value;
      setPersonalInfo(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }

  function handleProductInfo(field) {
    return function (e) {
      var val = e.target.value;
      setProductInfo(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }

  function handleShipment(field) {
    return function (e) {
      var val = e.target.value;
      setShipment(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[field] = val;
        return next;
      });
    };
  }

  var personalInfoInvalid = submitted[0] && !isStepValid(0);

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Form Wizard', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Form Wizard', panelClass: 'with-scroll' },
            React.createElement('div', { className: 'ba-wizard' },
              /* Navigation tabs */
              React.createElement('div', { className: 'ba-wizard-navigation-container' },
                stepTitles.map(function (title, idx) {
                  return React.createElement('div', {
                    key: idx,
                    className: 'ba-wizard-navigation' + (tabNum === idx ? ' active' : ''),
                    onClick: function () { selectTab(idx); }
                  }, title);
                })
              ),
              /* Progress bar */
              React.createElement('div', { className: 'progress ba-wizard-progress' },
                React.createElement('div', {
                  className: 'progress-bar progress-bar-danger active',
                  role: 'progressbar',
                  'aria-valuemin': '0',
                  'aria-valuemax': '100',
                  style: { width: progress + '%' }
                })
              ),
              /* Steps */
              React.createElement('div', { className: 'steps', ref: stepsRef },
                /* Step 1: Personal Info */
                React.createElement(WizardStep, { active: tabNum === 0 },
                  React.createElement('form', { name: 'personalInfoForm', noValidate: true },
                    React.createElement('div', { className: 'row' },
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', {
                          className: 'form-group has-feedback' +
                            (submitted[0] && !personalInfo.username ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'exampleUsername1' }, 'Username'),
                          React.createElement('input', {
                            type: 'text', className: 'form-control', id: 'exampleUsername1',
                            name: 'username', placeholder: 'Username',
                            value: personalInfo.username, onChange: handlePersonalInfo('username'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        React.createElement('div', {
                          className: 'form-group' +
                            (submitted[0] && (!personalInfo.email || personalInfo.email.indexOf('@') === -1) ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
                          React.createElement('input', {
                            type: 'email', className: 'form-control', id: 'exampleInputEmail1',
                            name: 'email', placeholder: 'Email',
                            value: personalInfo.email, onChange: handlePersonalInfo('email'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Proper email required')
                        )
                      ),
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', {
                          className: 'form-group' +
                            (submitted[0] && !personalInfo.password ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
                          React.createElement('input', {
                            type: 'password', className: 'form-control', id: 'exampleInputPassword1',
                            name: 'password', placeholder: 'Password',
                            value: personalInfo.password, onChange: handlePersonalInfo('password'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        React.createElement('div', {
                          className: 'form-group' +
                            (submitted[0] && personalInfo.password !== personalInfo.confirmPassword ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'exampleInputConfirmPassword1' }, 'Confirm Password'),
                          React.createElement('input', {
                            type: 'password', className: 'form-control', id: 'exampleInputConfirmPassword1',
                            name: 'confirmPassword', placeholder: 'Confirm Password',
                            value: personalInfo.confirmPassword, onChange: handlePersonalInfo('confirmPassword'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Passwords should match')
                        )
                      )
                    )
                  )
                ),
                /* Step 2: Product Info */
                React.createElement(WizardStep, { active: tabNum === 1 },
                  React.createElement('form', { name: 'productInfoForm', noValidate: true },
                    React.createElement('div', { className: 'row' },
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', {
                          className: 'form-group has-feedback' +
                            (submitted[1] && !productInfo.productName ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'productName' }, 'Product name'),
                          React.createElement('input', {
                            type: 'text', className: 'form-control', id: 'productName',
                            name: 'productName', placeholder: 'Product name',
                            value: productInfo.productName, onChange: handleProductInfo('productName'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        React.createElement('div', {
                          className: 'form-group' +
                            (submitted[1] && !productInfo.productId ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'productId' }, 'Product id'),
                          React.createElement('input', {
                            type: 'text', className: 'form-control', id: 'productId',
                            name: 'productId', placeholder: 'productId',
                            value: productInfo.productId, onChange: handleProductInfo('productId'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                        )
                      ),
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', { className: 'form-group' },
                          React.createElement('label', { htmlFor: 'productName' }, 'Category'),
                          React.createElement('select', { className: 'form-control selectpicker', title: 'Category', defaultValue: 'Electronics' },
                            React.createElement('option', { value: 'Electronics' }, 'Electronics'),
                            React.createElement('option', { value: 'Toys' }, 'Toys'),
                            React.createElement('option', { value: 'Accessories' }, 'Accessories')
                          )
                        )
                      )
                    )
                  )
                ),
                /* Step 3: Shipment */
                React.createElement(WizardStep, { active: tabNum === 2 },
                  React.createElement('form', { name: 'addressForm', noValidate: true },
                    React.createElement('div', { className: 'row' },
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', {
                          className: 'form-group has-feedback' +
                            (submitted[2] && !shipment.address ? ' has-error' : '')
                        },
                          React.createElement('label', { htmlFor: 'productName' }, 'Shipment address'),
                          React.createElement('input', {
                            type: 'text', className: 'form-control', id: 'address',
                            name: 'address', placeholder: 'Shipment address',
                            value: shipment.address, onChange: handleShipment('address'),
                            required: true
                          }),
                          React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
                        )
                      ),
                      React.createElement('div', { className: 'col-md-6' },
                        React.createElement('div', { className: 'form-group' },
                          React.createElement('label', { htmlFor: 'productName' }, 'Shipment method'),
                          React.createElement('select', { className: 'form-control selectpicker', title: 'Category', defaultValue: 'Fast & expensive' },
                            React.createElement('option', { value: 'Fast & expensive' }, 'Fast & expensive'),
                            React.createElement('option', { value: 'Cheap & free' }, 'Cheap & free')
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
                React.createElement(WizardStep, { active: tabNum === 3 },
                  React.createElement('form', { className: 'form-horizontal', name: 'finishForm', noValidate: true },
                    'Congratulations! You have successfully filled the form!'
                  )
                )
              ),
              /* Pager navigation */
              React.createElement('nav', null,
                React.createElement('ul', { className: 'pager ba-wizard-pager' },
                  React.createElement('li', { className: 'previous' },
                    React.createElement('button', {
                      disabled: tabNum === 0,
                      onClick: previousTab,
                      type: 'button',
                      className: 'btn btn-primary'
                    }, React.createElement('span', { 'aria-hidden': 'true' }, '\u2190'), ' previous')
                  ),
                  React.createElement('li', { className: 'next' },
                    React.createElement('button', {
                      disabled: tabNum === totalSteps - 1,
                      onClick: nextTab,
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
    )
  );
}
