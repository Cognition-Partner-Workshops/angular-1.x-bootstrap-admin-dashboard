import React, { useState, useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

/* ── Standard Fields ─────────────────────────────────────── */
function StandardFields() {
  return React.createElement('form', null,
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
  );
}

/* ── Tags Input ──────────────────────────────────────────── */
function TagsInput() {
  var ref = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !ref.current || !$.fn.tagsinput) return;
    try {
      $(ref.current).find('input[data-role="tagsinput"]').each(function () {
        var color = $(this).attr('tag-input');
        $(this).tagsinput({ tagClass: 'label label-' + color });
      });
    } catch (e) { /* plugin not available */ }
  }, []);

  return React.createElement('div', { className: 'form-group', ref: ref },
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'tag-input': 'primary', defaultValue: 'Amsterdam,Washington,Sydney,Beijing,Cairo', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'tag-input': 'warning', defaultValue: 'Minsk,Prague,Vilnius,Warsaw', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'tag-input': 'danger', defaultValue: 'London,Berlin,Paris,Rome,Munich', 'data-role': 'tagsinput', placeholder: 'Add Tag' })
    )
  );
}

/* ── Input Groups ────────────────────────────────────────── */
function InputGroups() {
  return React.createElement(React.Fragment, null,
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
  );
}

/* ── Checkboxes & Radios ─────────────────────────────────── */
function CheckboxesRadios() {
  return React.createElement(React.Fragment, null,
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
  );
}

/* ── On/Off Switches (ba-switcher) ───────────────────────── */
function SwitchesPanel() {
  var initial = [
    { style: 'primary', value: true },
    { style: 'success', value: false },
    { style: 'warning', value: true },
    { style: 'danger', value: true },
    { style: 'info', value: false }
  ];
  var _s = useState(initial.map(function (s) { return s.value; }));
  var values = _s[0];
  var setValues = _s[1];

  function toggle(idx) {
    setValues(function (prev) {
      var next = prev.slice();
      next[idx] = !next[idx];
      return next;
    });
  }

  return React.createElement('div', null,
    initial.map(function (sw, i) {
      return React.createElement('ba-switcher', { key: i },
        React.createElement('label', { className: 'switcher-container' },
          React.createElement('input', {
            type: 'checkbox',
            checked: values[i],
            onChange: function () { toggle(i); }
          }),
          React.createElement('div', { className: 'switcher ' + sw.style },
            React.createElement('div', { className: 'handle-container' },
              React.createElement('span', { className: 'handle handle-on' }, 'ON'),
              React.createElement('span', { className: 'handle' }),
              React.createElement('span', { className: 'handle handle-off' }, 'OFF')
            )
          )
        )
      );
    })
  );
}

/* ── Old On/Off Switches (bootstrap-switch) ──────────────── */
function OldSwitchesPanel() {
  var ref = useRef(null);
  var colors = ['primary', 'warning', 'danger', 'info', 'success'];

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !ref.current || !$.fn.bootstrapSwitch) return;
    try {
      $(ref.current).find('input[type="checkbox"]').each(function (i) {
        $(this).bootstrapSwitch({ size: 'small', onColor: colors[i] });
      });
    } catch (e) { /* plugin not available */ }
  }, []);

  return React.createElement('div', { ref: ref, className: 'switches clearfix' },
    colors.map(function (color) {
      return React.createElement('div', { key: color, className: 'switch-container ' + color },
        React.createElement('input', { type: 'checkbox', defaultChecked: true })
      );
    })
  );
}

/* ── Datepicker ──────────────────────────────────────────── */
function DatepickerPanel() {
  var _f = useState('dd-MMMM-yyyy');
  var format = _f[0];
  var setFormat = _f[1];
  var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  var today = new Date();
  var dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return React.createElement('div', { className: 'datepicker row' },
    React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
      React.createElement('h4', null, 'Inline'),
      React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
      React.createElement('div', { className: 'uib-datepicker-wrap' },
        React.createElement('table', { role: 'grid' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Su'),
              React.createElement('th', null, 'Mo'),
              React.createElement('th', null, 'Tu'),
              React.createElement('th', null, 'We'),
              React.createElement('th', null, 'Th'),
              React.createElement('th', null, 'Fr'),
              React.createElement('th', null, 'Sa')
            )
          ),
          React.createElement('tbody', null,
            React.createElement('tr', null,
              [1, 2, 3, 4, 5, 6, 7].map(function (d) {
                return React.createElement('td', { key: d },
                  React.createElement('button', { type: 'button', className: 'btn btn-default btn-sm' }, d)
                );
              })
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
      React.createElement('h4', null, 'Popup'),
      React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
      React.createElement('p', { className: 'input-group' },
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          'uib-datepicker-popup': format,
          defaultValue: '',
          readOnly: true
        }),
        React.createElement('span', { className: 'input-group-btn' },
          React.createElement('button', { type: 'button', className: 'btn btn-default' },
            React.createElement('i', { className: 'glyphicon glyphicon-calendar' })
          )
        )
      ),
      React.createElement('label', null,
        'Format: ',
        React.createElement('span', { className: 'muted-text' },
          '(manual alternate ', React.createElement('em', null, formats[0]), ')'
        )
      ),
      ' ',
      React.createElement('select', {
        className: 'form-control',
        'ng-model': 'format',
        value: format,
        onChange: function (e) { setFormat(e.target.value); }
      },
        formats.map(function (f) {
          return React.createElement('option', { key: f, value: f }, f);
        })
      )
    )
  );
}

/* ── Validation States ───────────────────────────────────── */
function ValidationStates() {
  return React.createElement(React.Fragment, null,
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
  );
}

/* ── Selects (ui-select) ─────────────────────────────────── */
function SelectsPanel() {
  var standardItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 }
  ];
  var searchItems = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 }
  ];
  var groupedItems = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }
  ];
  var groupedByItems = [
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
  var multipleItems = [
    { label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }, { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 }, { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 }, { label: 'Option 8', value: 8 }
  ];

  function renderSelect(placeholder, items, labelKey, opts) {
    opts = opts || {};
    return React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' + (opts.disabled ? ' disabled' : '') },
        React.createElement('span', { className: 'ui-select-placeholder' }, placeholder),
        !opts.disabled && React.createElement('select', { className: 'form-control', style: { display: 'none' } },
          items.map(function (item, idx) {
            return React.createElement('option', { key: idx, value: item.value || idx }, item[labelKey || 'label'] || item.name);
          })
        )
      )
    );
  }

  return React.createElement('div', { className: 'ng-cloak' },
    renderSelect('Standard Select', standardItems, 'label'),
    renderSelect('Select With Search', searchItems, 'label'),
    renderSelect('Disabled Selection', [], 'label', { disabled: true }),
    renderSelect('Select With Option Groups', groupedItems, 'label'),
    renderSelect('Select With Option Groups Function', groupedByItems, 'name'),
    renderSelect('Multiple Select', multipleItems, 'label'),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'input-group' },
        React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
          React.createElement('span', { className: 'ui-select-placeholder' }, 'Select With Clear Button'),
          React.createElement('select', { className: 'form-control', style: { display: 'none' } },
            multipleItems.map(function (item) {
              return React.createElement('option', { key: item.value, value: item.value }, item.label);
            })
          )
        ),
        React.createElement('span', { className: 'input-group-btn' },
          React.createElement('button', { type: 'button', className: 'btn btn-danger' },
            React.createElement('span', { className: 'glyphicon glyphicon-trash' })
          )
        )
      )
    )
  );
}

/* ── Old Selects (deprecated, selectpicker) ──────────────── */
function OldSelectsPanel() {
  var ref = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !ref.current || !$.fn.selectpicker) return;
    try {
      $(ref.current).find('select').each(function () {
        $(this).selectpicker({ dropupAuto: false, hideDisabled: true });
      });
    } catch (e) { /* plugin not available */ }
  }, []);

  var standardItems = [
    { label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }, { label: 'Option 4', value: 4 }
  ];
  var searchItems = [
    { label: 'Hot Dog, Fries and a Soda', value: 1 },
    { label: 'Burger, Shake and a Smile', value: 2 },
    { label: 'Sugar, Spice and all things nice', value: 3 },
    { label: 'Baby Back Ribs', value: 4 }
  ];
  var groupedItems = [
    { label: 'Group 1 - Option 1', value: 1, group: 'Group 1' },
    { label: 'Group 2 - Option 2', value: 2, group: 'Group 2' },
    { label: 'Group 1 - Option 3', value: 3, group: 'Group 1' },
    { label: 'Group 2 - Option 4', value: 4, group: 'Group 2' }
  ];
  var btnStyles = ['btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-danger', 'btn-inverse'];
  var btnTitles = ['Primary Select', 'Success Select', 'Warning Select', 'Info Select', 'Danger Select', 'Inverse Select'];

  return React.createElement('div', { ref: ref },
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Standard Select', defaultValue: '' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Standard Select'),
        standardItems.map(function (item) {
          return React.createElement('option', { key: item.value, value: item.value }, item.label);
        })
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker with-search', 'data-live-search': 'true', title: 'Select With Search', selectpicker: '', defaultValue: '' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Select With Search'),
        searchItems.map(function (item) {
          return React.createElement('option', { key: item.value, value: item.value }, item.label);
        })
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', title: 'Option Types', selectpicker: '', defaultValue: '' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Option Types'),
        React.createElement('option', null, 'Standard option'),
        React.createElement('option', { 'data-subtext': 'option subtext' }, 'Option with subtext'),
        React.createElement('option', { disabled: true }, 'Disabled Option'),
        React.createElement('option', { 'data-icon': 'glyphicon-heart' }, 'Option with cion')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', disabled: true, title: 'Disabled Select', selectpicker: '', defaultValue: '' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Disabled Select'),
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control', title: 'Select with Option Groups', selectpicker: '', defaultValue: '' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Select with Option Groups'),
            React.createElement('optgroup', { label: 'Group 1' },
              groupedItems.filter(function (i) { return i.group === 'Group 1'; }).map(function (item) {
                return React.createElement('option', { key: item.value, value: item.value }, item.label);
              })
            ),
            React.createElement('optgroup', { label: 'Group 2' },
              groupedItems.filter(function (i) { return i.group === 'Group 2'; }).map(function (item) {
                return React.createElement('option', { key: item.value, value: item.value }, item.label);
              })
            )
          )
        )
      ),
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control', title: 'Select with Divider', selectpicker: '', defaultValue: '' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Select with Divider'),
            React.createElement('option', null, 'Group 1 - Option 1'),
            React.createElement('option', null, 'Group 1 - Option 2'),
            React.createElement('option', { 'data-divider': 'true' }),
            React.createElement('option', null, 'Group 2 - Option 1'),
            React.createElement('option', null, 'Group 2 - Option 2')
          )
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control', title: 'Multiple Select', multiple: true, selectpicker: '', defaultValue: [] },
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control', title: 'Multiple Select with Limit', multiple: true, 'data-max-options': '2', selectpicker: '', defaultValue: [] },
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-sm-6' },
        btnStyles.slice(0, 3).map(function (style, idx) {
          return React.createElement('div', { key: style, className: 'form-group' },
            React.createElement('select', { className: 'form-control', title: btnTitles[idx], 'data-style': style, 'data-container': 'body', selectpicker: '', defaultValue: '' },
              React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, btnTitles[idx]),
              React.createElement('option', null, 'Option 1'),
              React.createElement('option', null, 'Option 2'),
              React.createElement('option', null, 'Option 3'),
              React.createElement('option', null, 'Option 4')
            )
          );
        })
      ),
      React.createElement('div', { className: 'col-sm-6' },
        btnStyles.slice(3).map(function (style, idx) {
          return React.createElement('div', { key: style, className: 'form-group' },
            React.createElement('select', { className: 'form-control', title: btnTitles[idx + 3], 'data-style': style, 'data-container': 'body', selectpicker: '', defaultValue: '' },
              React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, btnTitles[idx + 3]),
              React.createElement('option', null, 'Option 1'),
              React.createElement('option', null, 'Option 2'),
              React.createElement('option', null, 'Option 3'),
              React.createElement('option', null, 'Option 4')
            )
          );
        })
      )
    )
  );
}

/* ── Main Form Inputs Page ───────────────────────────────── */
export function FormInputsPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Standard Fields', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Standard Fields', panelClass: 'with-scroll' },
            React.createElement(StandardFields)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Tags Input', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Tags Input', panelClass: 'with-scroll' },
            React.createElement(TagsInput)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Input Groups', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Input Groups', panelClass: 'with-scroll' },
            React.createElement(InputGroups)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Checkboxes & Radios', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Checkboxes & Radios', panelClass: 'with-scroll' },
            React.createElement(CheckboxesRadios)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'On/Off Switches', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'On/Off Switches', panelClass: 'with-scroll' },
            React.createElement(SwitchesPanel)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Old On/Off Switches (Deprecated)', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Old On/Off Switches (Deprecated)', panelClass: 'with-scroll' },
            React.createElement(OldSwitchesPanel)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Datepicker', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Datepicker', panelClass: 'with-scroll' },
            React.createElement(DatepickerPanel)
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Validation States', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Validation States', panelClass: 'with-scroll' },
            React.createElement(ValidationStates)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Selects', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Selects', panelClass: 'with-scroll' },
            React.createElement(SelectsPanel)
          )
        ),
        React.createElement('div', { 'ba-panel': '', 'ba-panel-title': 'Old selects(deprecated)', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Old selects(deprecated)', panelClass: 'with-scroll' },
            React.createElement(OldSelectsPanel)
          )
        )
      )
    )
  );
}
