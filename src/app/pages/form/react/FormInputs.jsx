import React, { useState } from 'react';
var Panel = require('./Panel');
var Switch = require('./Switch');

function StandardFields() {
  return (
    React.createElement('form', null,
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'input01' }, 'Text'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'input01', placeholder: 'Text' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'input02' }, 'Password'),
        React.createElement('input', { type: 'password', className: 'form-control', id: 'input02', placeholder: 'Password' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'input03' }, 'Rounded Corners'),
        React.createElement('input', { type: 'text', className: 'form-control form-control-rounded', id: 'input03', placeholder: 'Rounded Corners' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'input04' }, 'With help'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'input04', placeholder: 'With help' }),
        React.createElement('span', { className: 'help-block sub-little-text' }, 'A block of help text that breaks onto a new line and may extend beyond one line.')
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'input05' }, 'Disabled Input'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'input05', placeholder: 'Disabled Input', disabled: true })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { htmlFor: 'textarea01' }, 'Textarea'),
        React.createElement('textarea', { placeholder: 'Default Input', className: 'form-control', id: 'textarea01' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', className: 'form-control input-sm', id: 'input2', placeholder: 'Small Input' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', className: 'form-control input-lg', id: 'input4', placeholder: 'Large Input' })
      )
    )
  );
}

function TagsInput() {
  return (
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', defaultValue: 'Amsterdam,Washington,Sydney,Beijing,Cairo', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', defaultValue: 'Minsk,Prague,Vilnius,Warsaw', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', { type: 'text', defaultValue: 'London,Berlin,Paris,Rome,Munich', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
      )
    )
  );
}

function InputGroups() {
  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'input-group' },
        React.createElement('span', { className: 'input-group-addon input-group-addon-primary addon-left', id: 'basic-addon1' }, '@'),
        React.createElement('input', { type: 'text', className: 'form-control with-primary-addon', placeholder: 'Username', 'aria-describedby': 'basic-addon1' })
      ),
      React.createElement('div', { className: 'input-group' },
        React.createElement('input', { type: 'text', className: 'form-control with-warning-addon', placeholder: "Recipient's username", 'aria-describedby': 'basic-addon2' }),
        React.createElement('span', { className: 'input-group-addon input-group-addon-warning addon-right', id: 'basic-addon2' }, '@example.com')
      ),
      React.createElement('div', { className: 'input-group' },
        React.createElement('span', { className: 'input-group-addon addon-left input-group-addon-success' }, '$'),
        React.createElement('input', { type: 'text', className: 'form-control with-success-addon', 'aria-label': 'Amount (to the nearest dollar)' }),
        React.createElement('span', { className: 'input-group-addon addon-right input-group-addon-success' }, '.00')
      ),
      React.createElement('div', { className: 'input-group' },
        React.createElement('input', { type: 'text', className: 'form-control with-danger-addon', placeholder: 'Search for...' }),
        React.createElement('span', { className: 'input-group-btn' },
          React.createElement('button', { className: 'btn btn-danger', type: 'button' }, 'Go!')
        )
      )
    )
  );
}

function CheckboxesRadios() {
  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'checkbox-demo-row' },
        React.createElement('div', { className: 'input-demo checkbox-demo row' },
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              React.createElement('input', { type: 'checkbox', id: 'inlineCheckbox01', defaultValue: 'option1' }),
              React.createElement('span', null, 'Check 1')
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              React.createElement('input', { type: 'checkbox', id: 'inlineCheckbox02', defaultValue: 'option2' }),
              React.createElement('span', null, 'Check 2')
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              React.createElement('input', { type: 'checkbox', id: 'inlineCheckbox03', defaultValue: 'option3' }),
              React.createElement('span', null, 'Check 3')
            )
          )
        ),
        React.createElement('div', { className: 'input-demo radio-demo row' },
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'radio-inline custom-radio nowrap' },
              React.createElement('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio1', defaultValue: 'option1' }),
              React.createElement('span', null, 'Option 1')
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'radio-inline custom-radio nowrap' },
              React.createElement('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio2', defaultValue: 'option2' }),
              React.createElement('span', null, 'Option 2')
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('label', { className: 'radio-inline custom-radio nowrap' },
              React.createElement('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio3', defaultValue: 'option3' }),
              React.createElement('span', null, 'Option3')
            )
          )
        )
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'checkbox disabled' },
          React.createElement('label', { className: 'custom-checkbox nowrap' },
            React.createElement('input', { type: 'checkbox', defaultValue: '', disabled: true }),
            React.createElement('span', null, 'Checkbox is disabled')
          )
        ),
        React.createElement('div', { className: 'radio disabled' },
          React.createElement('label', { className: 'custom-radio nowrap' },
            React.createElement('input', { type: 'radio', name: 'optionsRadios', id: 'optionsRadios3', defaultValue: 'option3', disabled: true }),
            React.createElement('span', null, 'Disabled option')
          )
        )
      )
    )
  );
}

function SwitchesPanel() {
  var _s = useState({ s1: true, s2: false, s3: true, s4: true, s5: false });
  var switches = _s[0];
  var setSwitches = _s[1];

  function toggle(key) {
    return function (val) {
      var next = {};
      for (var k in switches) { next[k] = switches[k]; }
      next[key] = val;
      setSwitches(next);
    };
  }

  return (
    React.createElement('div', null,
      React.createElement(Switch, { color: 'primary', checked: switches.s1, onChange: toggle('s1') }),
      React.createElement(Switch, { color: 'success', checked: switches.s2, onChange: toggle('s2') }),
      React.createElement(Switch, { color: 'warning', checked: switches.s3, onChange: toggle('s3') }),
      React.createElement(Switch, { color: 'danger', checked: switches.s4, onChange: toggle('s4') }),
      React.createElement(Switch, { color: 'info', checked: switches.s5, onChange: toggle('s5') })
    )
  );
}

function OldSwitchesPanel() {
  var _s = useState({ primary: true, warning: true, danger: true, info: true, success: true });
  var values = _s[0];
  var setValues = _s[1];

  function toggle(key) {
    return function (val) {
      var next = {};
      for (var k in values) { next[k] = values[k]; }
      next[key] = val;
      setValues(next);
    };
  }

  return (
    React.createElement('div', { className: 'switches clearfix' },
      React.createElement(Switch, { color: 'primary', checked: values.primary, onChange: toggle('primary') }),
      React.createElement(Switch, { color: 'warning', checked: values.warning, onChange: toggle('warning') }),
      React.createElement(Switch, { color: 'danger', checked: values.danger, onChange: toggle('danger') }),
      React.createElement(Switch, { color: 'info', checked: values.info, onChange: toggle('info') }),
      React.createElement(Switch, { color: 'success', checked: values.success, onChange: toggle('success') })
    )
  );
}

function DatePickers() {
  var _s = useState(new Date());
  var dt = _s[0];
  var setDt = _s[1];

  var _s2 = useState(false);
  var popupOpen = _s2[0];
  var setPopupOpen = _s2[1];

  var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  var _sf = useState(formats[0]);
  var format = _sf[0];
  var setFormat = _sf[1];

  var dateStr = dt ? dt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    React.createElement('div', { className: 'datepicker row' },
      React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
        React.createElement('h4', null, 'Inline'),
        React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
        React.createElement('div', { className: 'uib-datepicker-wrap' },
          React.createElement('input', {
            type: 'date',
            className: 'form-control',
            value: dt ? dt.toISOString().split('T')[0] : '',
            onChange: function (e) { setDt(e.target.value ? new Date(e.target.value + 'T00:00:00') : null); }
          })
        )
      ),
      React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
        React.createElement('h4', null, 'Popup'),
        React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
        React.createElement('p', { className: 'input-group' },
          React.createElement('input', {
            type: 'date',
            className: 'form-control',
            value: dt ? dt.toISOString().split('T')[0] : '',
            onChange: function (e) { setDt(e.target.value ? new Date(e.target.value + 'T00:00:00') : null); },
            required: true
          }),
          React.createElement('span', { className: 'input-group-btn' },
            React.createElement('button', {
              type: 'button',
              className: 'btn btn-default',
              onClick: function () { setPopupOpen(!popupOpen); }
            }, React.createElement('i', { className: 'glyphicon glyphicon-calendar' }))
          )
        ),
        React.createElement('label', null, 'Format: ',
          React.createElement('span', { className: 'muted-text' }, '(manual alternate ', React.createElement('em', null, 'M/d/yy'), ')')
        ),
        React.createElement('select', {
          className: 'form-control',
          value: format,
          onChange: function (e) { setFormat(e.target.value); }
        },
          formats.map(function (f) {
            return React.createElement('option', { key: f, value: f }, f);
          })
        )
      )
    )
  );
}

function ValidationStates() {
  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'form-group has-success' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputSuccess1' }, 'Input with success'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputSuccess1' })
      ),
      React.createElement('div', { className: 'form-group has-warning' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputWarning1' }, 'Input with warning'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputWarning1' })
      ),
      React.createElement('div', { className: 'form-group has-error' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputError1' }, 'Input with error'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputError1' })
      ),
      React.createElement('div', { className: 'has-success' },
        React.createElement('div', { className: 'checkbox' },
          React.createElement('label', { className: 'custom-checkbox' },
            React.createElement('input', { type: 'checkbox', id: 'checkboxSuccess', defaultValue: 'option1' }),
            React.createElement('span', null, 'Checkbox with success')
          )
        )
      ),
      React.createElement('div', { className: 'has-warning' },
        React.createElement('div', { className: 'checkbox' },
          React.createElement('label', { className: 'custom-checkbox' },
            React.createElement('input', { type: 'checkbox', id: 'checkboxWarning', defaultValue: 'option1' }),
            React.createElement('span', null, 'Checkbox with warning')
          )
        )
      ),
      React.createElement('div', { className: 'has-error' },
        React.createElement('div', { className: 'checkbox' },
          React.createElement('label', { className: 'custom-checkbox' },
            React.createElement('input', { type: 'checkbox', id: 'checkboxError', defaultValue: 'option1' }),
            React.createElement('span', null, 'Checkbox with error')
          )
        )
      ),
      React.createElement('div', { className: 'form-group has-success has-feedback' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputSuccess2' }, 'Input with success'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputSuccess2', 'aria-describedby': 'inputSuccess2Status' }),
        React.createElement('i', { className: 'ion-checkmark-circled form-control-feedback', 'aria-hidden': 'true' }),
        React.createElement('span', { id: 'inputSuccess2Status', className: 'sr-only' }, '(success)')
      ),
      React.createElement('div', { className: 'form-group has-warning has-feedback' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputWarning2' }, 'Input with warning'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputWarning2', 'aria-describedby': 'inputWarning2Status' }),
        React.createElement('i', { className: 'ion-alert-circled form-control-feedback', 'aria-hidden': 'true' }),
        React.createElement('span', { id: 'inputWarning2Status', className: 'sr-only' }, '(warning)')
      ),
      React.createElement('div', { className: 'form-group has-error has-feedback' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputError2' }, 'Input with error'),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'inputError2', 'aria-describedby': 'inputError2Status' }),
        React.createElement('i', { className: 'ion-android-cancel form-control-feedback', 'aria-hidden': 'true' }),
        React.createElement('span', { id: 'inputError2Status', className: 'sr-only' }, '(error)')
      ),
      React.createElement('div', { className: 'form-group has-success has-feedback' },
        React.createElement('label', { className: 'control-label', htmlFor: 'inputGroupSuccess1' }, 'Input group with success'),
        React.createElement('div', { className: 'input-group' },
          React.createElement('span', { className: 'input-group-addon addon-left' }, '@'),
          React.createElement('input', { type: 'text', className: 'form-control', id: 'inputGroupSuccess1', 'aria-describedby': 'inputGroupSuccess1Status' })
        ),
        React.createElement('i', { className: 'ion-checkmark-circled form-control-feedback', 'aria-hidden': 'true' }),
        React.createElement('span', { id: 'inputGroupSuccess1Status', className: 'sr-only' }, '(success)')
      )
    )
  );
}

function SelectsPanel() {
  var standardSelectItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
  ];
  var selectWithSearchItems = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 }
  ];
  var groupedSelectItems = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }
  ];
  var groupedBySelectItems = [
    { name: 'Adam', country: 'United States' },
    { name: 'Amalie', country: 'Argentina' },
    { name: 'Estefanía', country: 'Argentina' },
    { name: 'Adrian', country: 'Ecuador' },
    { name: 'Wladimir', country: 'Ecuador' },
    { name: 'Samantha', country: 'United States' },
    { name: 'Nicole', country: 'Colombia' },
    { name: 'Natasha', country: 'Ecuador' },
    { name: 'Michael', country: 'Colombia' },
    { name: 'Nicolás', country: 'Colombia' }
  ];
  var multipleSelectItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
    { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 },
    { label: 'Option 8', value: 8 }
  ];

  var _s1 = useState('');
  var selected = _s1[0];
  var setSelected = _s1[1];

  var _s2 = useState('');
  var searchSelected = _s2[0];
  var setSearchSelected = _s2[1];

  var _s3 = useState('');
  var groupedSelected = _s3[0];
  var setGroupedSelected = _s3[1];

  var _s4 = useState('');
  var groupedBySelected = _s4[0];
  var setGroupedBySelected = _s4[1];

  var _s5 = useState([]);
  var multiSelected = _s5[0];
  var setMultiSelected = _s5[1];

  var _s6 = useState([]);
  var withDeleteSelected = _s6[0];
  var setWithDeleteSelected = _s6[1];

  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: selected,
          onChange: function (e) { setSelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Standard Select'),
          standardSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: searchSelected,
          onChange: function (e) { setSearchSelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Select With Search'),
          selectWithSearchItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', { className: 'form-control', disabled: true },
          React.createElement('option', { value: '' }, 'Disabled Selection')
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: groupedSelected,
          onChange: function (e) { setGroupedSelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Select With Option Groups'),
          React.createElement('optgroup', { label: 'Group 1' },
            groupedSelectItems.filter(function (i) { return i.group === 'Group 1'; }).map(function (item) {
              return React.createElement('option', { key: item.value, value: item.value }, item.label);
            })
          ),
          React.createElement('optgroup', { label: 'Group 2' },
            groupedSelectItems.filter(function (i) { return i.group === 'Group 2'; }).map(function (item) {
              return React.createElement('option', { key: item.value, value: item.value }, item.label);
            })
          )
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: groupedBySelected,
          onChange: function (e) { setGroupedBySelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Select With Option Groups Function'),
          React.createElement('optgroup', { label: 'From A - M' },
            groupedBySelectItems.filter(function (i) { return i.name[0] >= 'A' && i.name[0] <= 'M'; }).map(function (item) {
              return React.createElement('option', { key: item.name, value: item.name }, item.name);
            })
          ),
          React.createElement('optgroup', { label: 'From N - Z' },
            groupedBySelectItems.filter(function (i) { return i.name[0] >= 'N' && i.name[0] <= 'Z'; }).map(function (item) {
              return React.createElement('option', { key: item.name, value: item.name }, item.name);
            })
          )
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          multiple: true,
          value: multiSelected,
          onChange: function (e) {
            var opts = e.target.options;
            var vals = [];
            for (var i = 0; i < opts.length; i++) {
              if (opts[i].selected) vals.push(opts[i].value);
            }
            setMultiSelected(vals);
          }
        },
          multipleSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('div', { className: 'input-group' },
          React.createElement('select', {
            className: 'form-control',
            multiple: true,
            value: withDeleteSelected,
            onChange: function (e) {
              var opts = e.target.options;
              var vals = [];
              for (var i = 0; i < opts.length; i++) {
                if (opts[i].selected) vals.push(opts[i].value);
              }
              setWithDeleteSelected(vals);
            }
          },
            multipleSelectItems.map(function (item) {
              return React.createElement('option', { key: item.value, value: item.value }, item.label);
            })
          ),
          React.createElement('span', { className: 'input-group-btn' },
            React.createElement('button', {
              type: 'button',
              className: 'btn btn-danger',
              onClick: function () { setWithDeleteSelected([]); }
            },
              React.createElement('span', { className: 'glyphicon glyphicon-trash' })
            )
          )
        )
      )
    )
  );
}

function OldSelectsPanel() {
  var standardSelectItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
  ];
  var selectWithSearchItems = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 }
  ];
  var groupedSelectItems = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }
  ];

  var _s1 = useState('');
  var standardSelected = _s1[0];
  var setStandardSelected = _s1[1];

  var _s2 = useState('');
  var searchSelected = _s2[0];
  var setSearchSelected = _s2[1];

  var _s3 = useState('');
  var groupedSelected = _s3[0];
  var setGroupedSelected = _s3[1];

  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: standardSelected,
          onChange: function (e) { setStandardSelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Standard Select'),
          standardSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', {
          className: 'form-control',
          value: searchSelected,
          onChange: function (e) { setSearchSelected(e.target.value); }
        },
          React.createElement('option', { value: '', disabled: true }, 'Select With Search'),
          selectWithSearchItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', { className: 'form-control', defaultValue: '' },
          React.createElement('option', { value: '', disabled: true }, 'Option Types'),
          React.createElement('option', null, 'Standard option'),
          React.createElement('option', null, 'Option with subtext'),
          React.createElement('option', { disabled: true }, 'Disabled Option'),
          React.createElement('option', null, 'Option with icon')
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', { className: 'form-control', disabled: true },
          React.createElement('option', null, 'Disabled Select')
        )
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('select', {
              className: 'form-control',
              value: groupedSelected,
              onChange: function (e) { setGroupedSelected(e.target.value); }
            },
              React.createElement('option', { value: '', disabled: true }, 'Select with Option Groups'),
              React.createElement('optgroup', { label: 'Group 1' },
                groupedSelectItems.filter(function (i) { return i.group === 'Group 1'; }).map(function (item) {
                  return React.createElement('option', { key: item.value, value: item.value }, item.label);
                })
              ),
              React.createElement('optgroup', { label: 'Group 2' },
                groupedSelectItems.filter(function (i) { return i.group === 'Group 2'; }).map(function (item) {
                  return React.createElement('option', { key: item.value, value: item.value }, item.label);
                })
              )
            )
          )
        ),
        React.createElement('div', { className: 'col-sm-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('select', { className: 'form-control', defaultValue: '' },
              React.createElement('option', { value: '', disabled: true }, 'Select with Divider'),
              React.createElement('option', null, 'Group 1 - Option 1'),
              React.createElement('option', null, 'Group 1 - Option 2'),
              React.createElement('option', { disabled: true }, '──────────'),
              React.createElement('option', null, 'Group 2 - Option 1'),
              React.createElement('option', null, 'Group 2 - Option 2')
            )
          )
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', { className: 'form-control', multiple: true, defaultValue: [] },
          standardSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('select', { className: 'form-control', multiple: true, defaultValue: [] },
          standardSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-sm-6' },
          ['Primary', 'Success', 'Warning'].map(function (style) {
            return React.createElement('div', { key: style, className: 'form-group' },
              React.createElement('select', { className: 'form-control', defaultValue: '' },
                React.createElement('option', { value: '', disabled: true }, style + ' Select'),
                React.createElement('option', null, 'Option 1'),
                React.createElement('option', null, 'Option 2'),
                React.createElement('option', null, 'Option 3'),
                React.createElement('option', null, 'Option 4')
              )
            );
          })
        ),
        React.createElement('div', { className: 'col-sm-6' },
          ['Info', 'Danger', 'Inverse'].map(function (style) {
            return React.createElement('div', { key: style, className: 'form-group' },
              React.createElement('select', { className: 'form-control', defaultValue: '' },
                React.createElement('option', { value: '', disabled: true }, style + ' Select'),
                React.createElement('option', null, 'Option 1'),
                React.createElement('option', null, 'Option 2'),
                React.createElement('option', null, 'Option 3'),
                React.createElement('option', null, 'Option 4')
              )
            );
          })
        )
      )
    )
  );
}

function FormInputs() {
  return (
    React.createElement('div', { className: 'widgets' },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement(Panel, { title: 'Standard Fields', panelClass: 'with-scroll' },
            React.createElement(StandardFields, null)
          ),
          React.createElement(Panel, { title: 'Tags Input', panelClass: 'with-scroll' },
            React.createElement(TagsInput, null)
          ),
          React.createElement(Panel, { title: 'Input Groups', panelClass: 'with-scroll' },
            React.createElement(InputGroups, null)
          ),
          React.createElement(Panel, { title: 'Checkboxes & Radios', panelClass: 'with-scroll' },
            React.createElement(CheckboxesRadios, null)
          ),
          React.createElement(Panel, { title: 'On/Off Switches', panelClass: 'with-scroll' },
            React.createElement(SwitchesPanel, null)
          ),
          React.createElement(Panel, { title: 'Old On/Off Switches (Deprecated)', panelClass: 'with-scroll' },
            React.createElement(OldSwitchesPanel, null)
          ),
          React.createElement(Panel, { title: 'Datepicker', panelClass: 'with-scroll' },
            React.createElement(DatePickers, null)
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement(Panel, { title: 'Validation States', panelClass: 'with-scroll' },
            React.createElement(ValidationStates, null)
          ),
          React.createElement(Panel, { title: 'Selects', panelClass: 'with-scroll' },
            React.createElement(SelectsPanel, null)
          ),
          React.createElement(Panel, { title: 'Old selects(deprecated)', panelClass: 'with-scroll' },
            React.createElement(OldSelectsPanel, null)
          )
        )
      )
    )
  );
}

module.exports = FormInputs;
