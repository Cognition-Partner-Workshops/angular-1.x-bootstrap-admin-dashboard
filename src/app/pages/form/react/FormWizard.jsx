import React, { useState } from 'react';
var Panel = require('./Panel');

function FormWizard() {
  var _step = useState(0);
  var currentStep = _step[0];
  var setCurrentStep = _step[1];

  var _pi = useState({ username: '', email: '', password: '', confirmPassword: '' });
  var personalInfo = _pi[0];
  var setPersonalInfo = _pi[1];

  var _prod = useState({ productName: '', productId: '', category: 'Electronics' });
  var productInfo = _prod[0];
  var setProductInfo = _prod[1];

  var _ship = useState({ address: '', method: 'Fast & expensive', saveInfo: false });
  var shipment = _ship[0];
  var setShipment = _ship[1];

  var _submitted = useState({});
  var submitted = _submitted[0];
  var setSubmitted = _submitted[1];

  var steps = ['Personal info', 'Product Info', 'Shipment', 'Finish'];

  function arePasswordsEqual() {
    return personalInfo.confirmPassword && personalInfo.password === personalInfo.confirmPassword;
  }

  function updatePersonalInfo(field, value) {
    var next = {};
    for (var k in personalInfo) { next[k] = personalInfo[k]; }
    next[field] = value;
    setPersonalInfo(next);
  }

  function updateProductInfo(field, value) {
    var next = {};
    for (var k in productInfo) { next[k] = productInfo[k]; }
    next[field] = value;
    setProductInfo(next);
  }

  function updateShipment(field, value) {
    var next = {};
    for (var k in shipment) { next[k] = shipment[k]; }
    next[field] = value;
    setShipment(next);
  }

  function validateStep(step) {
    if (step === 0) {
      return personalInfo.username && personalInfo.email && personalInfo.password && arePasswordsEqual();
    }
    if (step === 1) {
      return productInfo.productName && productInfo.productId;
    }
    if (step === 2) {
      return shipment.address;
    }
    return true;
  }

  function goNext() {
    var s = {};
    for (var k in submitted) { s[k] = submitted[k]; }
    s[currentStep] = true;
    setSubmitted(s);
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function renderStepNav() {
    return React.createElement('ul', { className: 'nav nav-pills', style: { marginBottom: '20px' } },
      steps.map(function (title, i) {
        var cls = 'nav-item';
        return React.createElement('li', { key: i, className: cls, style: { display: 'inline-block', marginRight: '5px' } },
          React.createElement('a', {
            className: 'nav-link' + (i === currentStep ? ' active btn-primary' : ''),
            style: { cursor: i <= currentStep ? 'pointer' : 'default', padding: '8px 16px', borderRadius: '4px', display: 'inline-block', backgroundColor: i === currentStep ? '' : 'transparent' },
            onClick: function () {}
          }, (i + 1) + '. ' + title)
        );
      })
    );
  }

  function renderPersonalInfo() {
    var isSubmitted = submitted[0];
    return React.createElement('form', { noValidate: true },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group has-feedback' + (isSubmitted && !personalInfo.username ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'exampleUsername1' }, 'Username'),
            React.createElement('input', {
              type: 'text', className: 'form-control', id: 'exampleUsername1', placeholder: 'Username',
              value: personalInfo.username,
              onChange: function (e) { updatePersonalInfo('username', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
          ),
          React.createElement('div', { className: 'form-group' + (isSubmitted && !personalInfo.email ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
            React.createElement('input', {
              type: 'email', className: 'form-control', id: 'exampleInputEmail1', placeholder: 'Email',
              value: personalInfo.email,
              onChange: function (e) { updatePersonalInfo('email', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Proper email required')
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group' + (isSubmitted && !personalInfo.password ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
            React.createElement('input', {
              type: 'password', className: 'form-control', id: 'exampleInputPassword1', placeholder: 'Password',
              value: personalInfo.password,
              onChange: function (e) { updatePersonalInfo('password', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
          ),
          React.createElement('div', { className: 'form-group' + (isSubmitted && !arePasswordsEqual() ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'exampleInputConfirmPassword1' }, 'Confirm Password'),
            React.createElement('input', {
              type: 'password', className: 'form-control', id: 'exampleInputConfirmPassword1', placeholder: 'Confirm Password',
              value: personalInfo.confirmPassword,
              onChange: function (e) { updatePersonalInfo('confirmPassword', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Passwords should match')
          )
        )
      )
    );
  }

  function renderProductInfo() {
    var isSubmitted = submitted[1];
    return React.createElement('form', { noValidate: true },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group has-feedback' + (isSubmitted && !productInfo.productName ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'productName' }, 'Product name'),
            React.createElement('input', {
              type: 'text', className: 'form-control', id: 'productName', placeholder: 'Product name',
              value: productInfo.productName,
              onChange: function (e) { updateProductInfo('productName', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
          ),
          React.createElement('div', { className: 'form-group' + (isSubmitted && !productInfo.productId ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'productId' }, 'Product id'),
            React.createElement('input', {
              type: 'text', className: 'form-control', id: 'productId', placeholder: 'productId',
              value: productInfo.productId,
              onChange: function (e) { updateProductInfo('productId', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'category' }, 'Category'),
            React.createElement('select', {
              className: 'form-control',
              value: productInfo.category,
              onChange: function (e) { updateProductInfo('category', e.target.value); }
            },
              React.createElement('option', null, 'Electronics'),
              React.createElement('option', null, 'Toys'),
              React.createElement('option', null, 'Accessories')
            )
          )
        )
      )
    );
  }

  function renderShipment() {
    var isSubmitted = submitted[2];
    return React.createElement('form', { noValidate: true },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group has-feedback' + (isSubmitted && !shipment.address ? ' has-error' : '') },
            React.createElement('label', { htmlFor: 'address' }, 'Shipment address'),
            React.createElement('input', {
              type: 'text', className: 'form-control', id: 'address', placeholder: 'Shipment address',
              value: shipment.address,
              onChange: function (e) { updateShipment('address', e.target.value); }
            }),
            React.createElement('span', { className: 'help-block error-block basic-block' }, 'Required')
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'shipmentMethod' }, 'Shipment method'),
            React.createElement('select', {
              className: 'form-control',
              value: shipment.method,
              onChange: function (e) { updateShipment('method', e.target.value); }
            },
              React.createElement('option', null, 'Fast & expensive'),
              React.createElement('option', null, 'Cheap & free')
            )
          )
        )
      ),
      React.createElement('div', { className: 'checkbox' },
        React.createElement('label', { className: 'custom-checkbox' },
          React.createElement('input', {
            type: 'checkbox',
            checked: shipment.saveInfo,
            onChange: function (e) { updateShipment('saveInfo', e.target.checked); }
          }),
          React.createElement('span', null, 'Save shipment info')
        )
      )
    );
  }

  function renderFinish() {
    return React.createElement('form', { className: 'form-horizontal', noValidate: true },
      'Congratulations! You have successfully filled the form!'
    );
  }

  var stepRenderers = [renderPersonalInfo, renderProductInfo, renderShipment, renderFinish];

  return (
    React.createElement('div', { className: 'widgets' },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-12' },
          React.createElement(Panel, { title: 'Form Wizard', panelClass: 'with-scroll' },
            renderStepNav(),
            stepRenderers[currentStep](),
            React.createElement('div', { style: { marginTop: '20px' } },
              currentStep > 0 && React.createElement('button', {
                type: 'button',
                className: 'btn btn-default',
                style: { marginRight: '10px' },
                onClick: goPrev
              }, 'Previous'),
              currentStep < steps.length - 1 && React.createElement('button', {
                type: 'button',
                className: 'btn btn-primary',
                onClick: goNext
              }, 'Next')
            )
          )
        )
      )
    )
  );
}

module.exports = FormWizard;
