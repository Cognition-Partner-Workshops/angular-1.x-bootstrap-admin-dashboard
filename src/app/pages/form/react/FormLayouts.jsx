import React from 'react';
var Panel = require('./Panel');

function InlineForm() {
  return (
    React.createElement('form', { className: 'row form-inline' },
      React.createElement('div', { className: 'form-group col-sm-3 col-xs-6' },
        React.createElement('input', { type: 'text', className: 'form-control', id: 'exampleInputName2', placeholder: 'Name' })
      ),
      React.createElement('div', { className: 'form-group col-sm-3 col-xs-6' },
        React.createElement('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail2', placeholder: 'Email' })
      ),
      React.createElement('div', { className: 'checkbox' },
        React.createElement('label', { className: 'custom-checkbox' },
          React.createElement('input', { type: 'checkbox' }),
          React.createElement('span', null, 'Remember me')
        )
      ),
      React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Send invitation')
    )
  );
}

function BasicForm() {
  return (
    React.createElement('form', null,
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
        React.createElement('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail1', placeholder: 'Email' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
        React.createElement('input', { type: 'password', className: 'form-control', id: 'exampleInputPassword1', placeholder: 'Password' })
      ),
      React.createElement('div', { className: 'checkbox' },
        React.createElement('label', { className: 'custom-checkbox' },
          React.createElement('input', { type: 'checkbox' }),
          React.createElement('span', null, 'Check me out')
        )
      ),
      React.createElement('button', { type: 'submit', className: 'btn btn-danger' }, 'Submit')
    )
  );
}

function HorizontalForm() {
  return (
    React.createElement('form', { className: 'form-horizontal' },
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'inputEmail3', className: 'col-sm-2 control-label' }, 'Email'),
        React.createElement('div', { className: 'col-sm-10' },
          React.createElement('input', { type: 'email', className: 'form-control', id: 'inputEmail3', placeholder: 'Email' })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'inputPassword3', className: 'col-sm-2 control-label' }, 'Password'),
        React.createElement('div', { className: 'col-sm-10' },
          React.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword3', placeholder: 'Password' })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('div', { className: 'col-sm-offset-2 col-sm-10' },
          React.createElement('div', { className: 'checkbox' },
            React.createElement('label', { className: 'custom-checkbox' },
              React.createElement('input', { type: 'checkbox' }),
              React.createElement('span', null, 'Remember me')
            )
          )
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('div', { className: 'col-sm-offset-2 col-sm-10' },
          React.createElement('button', { type: 'submit', className: 'btn btn-warning' }, 'Sign in')
        )
      )
    )
  );
}

function FormWithoutLabels() {
  return (
    React.createElement('form', null,
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Recipients' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Subject' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('textarea', { className: 'form-control', placeholder: 'Message' })
      ),
      React.createElement('button', { type: 'submit', className: 'btn btn-success' }, 'Send')
    )
  );
}

function BlockForm() {
  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'inputFirstName' }, 'First Name'),
            React.createElement('input', { type: 'text', className: 'form-control', id: 'inputFirstName', placeholder: 'First Name' })
          )
        ),
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'inputLastName' }, 'Last Name'),
            React.createElement('input', { type: 'text', className: 'form-control', id: 'inputLastName', placeholder: 'Last Name' })
          )
        )
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'inputEmail' }, 'Email'),
            React.createElement('input', { type: 'email', className: 'form-control', id: 'inputEmail', placeholder: 'Email' })
          )
        ),
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'inputWebsite' }, 'Website'),
            React.createElement('input', { type: 'text', className: 'form-control', id: 'inputWebsite', placeholder: 'Website' })
          )
        )
      ),
      React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Submit')
    )
  );
}

function FormLayouts() {
  return (
    React.createElement('div', { className: 'widgets' },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-12' },
          React.createElement(Panel, { title: 'Inline Form', panelClass: 'with-scroll' },
            React.createElement(InlineForm, null)
          )
        )
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement(Panel, { title: 'Basic Form', panelClass: 'with-scroll' },
            React.createElement(BasicForm, null)
          ),
          React.createElement(Panel, { title: 'Horizontal Form', panelClass: 'with-scroll' },
            React.createElement(HorizontalForm, null)
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement(Panel, { title: 'Form Without Labels', panelClass: 'with-scroll' },
            React.createElement(FormWithoutLabels, null)
          ),
          React.createElement(Panel, { title: 'Block Form', panelClass: 'with-scroll' },
            React.createElement(BlockForm, null)
          )
        )
      )
    )
  );
}

module.exports = FormLayouts;
