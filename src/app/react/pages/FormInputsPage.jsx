import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  var containerRef = useRef(null);

  useEffect(function () {
    if (!containerRef.current || !window.jQuery) return;
    var $ = window.jQuery;
    try {
      $(containerRef.current).find('input[data-role="tagsinput"]').each(function () {
        var color = $(this).data('tag-color');
        $(this).tagsinput({ tagClass: 'label label-' + color });
      });
    } catch (e) { /* tagsinput plugin may not be loaded */ }
  }, []);

  return React.createElement('div', { className: 'form-group', ref: containerRef },
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'data-role': 'tagsinput', 'data-tag-color': 'primary', defaultValue: 'Amsterdam,Washington,Sydney,Beijing,Cairo', placeholder: 'Add Tag' })
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'data-role': 'tagsinput', 'data-tag-color': 'warning', defaultValue: 'Minsk,Prague,Vilnius,Warsaw', placeholder: 'Add Tag' })
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('input', { type: 'text', 'data-role': 'tagsinput', 'data-tag-color': 'danger', defaultValue: 'London,Berlin,Paris,Rome,Munich', placeholder: 'Add Tag' })
    )
  );
}

/* ── Input Groups ────────────────────────────────────────── */
function InputGroups() {
  return React.createElement('div', null,
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
  return React.createElement('div', null,
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
  var styles = ['primary', 'success', 'warning', 'danger', 'info'];
  var initValues = [true, false, true, true, false];
  var switches = styles.map(function (style, i) {
    return { style: style, defaultChecked: initValues[i] };
  });

  return React.createElement('div', null,
    switches.map(function (s, i) {
      return React.createElement('ba-switcher', { key: i },
        React.createElement('label', { className: 'switcher-container' },
          React.createElement('input', { type: 'checkbox', defaultChecked: s.defaultChecked }),
          React.createElement('div', { className: 'switcher ' + s.style },
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
  var containerRef = useRef(null);
  var colors = ['primary', 'warning', 'danger', 'info', 'success'];

  useEffect(function () {
    if (!containerRef.current || !window.jQuery) return;
    var $ = window.jQuery;
    try {
      $(containerRef.current).find('input[type="checkbox"]').each(function (i) {
        $(this).bootstrapSwitch({
          size: 'small',
          onColor: colors[i]
        });
      });
    } catch (e) { /* bootstrapSwitch plugin may not be loaded */ }
  }, []);

  return React.createElement('div', { ref: containerRef, className: 'switches clearfix' },
    colors.map(function (color, i) {
      return React.createElement('div', { key: i, className: 'switch-container ' + color },
        React.createElement('input', { type: 'checkbox', defaultChecked: true })
      );
    })
  );
}

/* ── Datepicker ──────────────────────────────────────────── */
function DatepickerPanel() {
  var now = new Date();
  var daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  var formatState = useState(formats[0]);
  var format = formatState[0];
  var setFormat = formatState[1];

  var year = now.getFullYear();
  var month = now.getMonth();
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var rows = [];
  var day = 1;
  for (var w = 0; w < 6 && day <= daysInMonth; w++) {
    var cells = [];
    for (var d = 0; d < 7; d++) {
      if ((w === 0 && d < firstDay) || day > daysInMonth) {
        cells.push(React.createElement('td', { key: d }));
      } else {
        var isToday = day === now.getDate();
        cells.push(React.createElement('td', { key: d, className: isToday ? 'active' : '' },
          React.createElement('button', { type: 'button', className: 'btn btn-default btn-sm' + (isToday ? ' btn-info' : '') }, day)
        ));
        day++;
      }
    }
    rows.push(React.createElement('tr', { key: w }, cells));
  }

  return React.createElement('div', { className: 'datepicker row' },
    React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
      React.createElement('h4', null, 'Inline'),
      React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
      React.createElement('div', { className: 'uib-datepicker-wrap' },
        React.createElement('table', { className: 'uib-daypicker', role: 'grid' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { colSpan: 7, className: 'text-center' },
                React.createElement('strong', null, months[month] + ' ' + year)
              )
            ),
            React.createElement('tr', null,
              daysOfWeek.map(function (dw) {
                return React.createElement('th', { key: dw, className: 'text-center' }, React.createElement('small', null, dw));
              })
            )
          ),
          React.createElement('tbody', null, rows)
        )
      )
    ),
    React.createElement('div', { className: 'col-xlg-6 col-md-12 col-sm-6' },
      React.createElement('h4', null, 'Popup'),
      React.createElement('label', null, 'Selected date is: ', React.createElement('em', null, dateStr)),
      React.createElement('p', { className: 'input-group' },
        React.createElement('input', { type: 'text', className: 'form-control', 'uib-datepicker-popup': format, defaultValue: dateStr, readOnly: true }),
        React.createElement('span', { className: 'input-group-btn' },
          React.createElement('button', { type: 'button', className: 'btn btn-default' },
            React.createElement('i', { className: 'glyphicon glyphicon-calendar' })
          )
        )
      ),
      React.createElement('label', null,
        'Format: ',
        React.createElement('span', { className: 'muted-text' }, '(manual alternate ', React.createElement('em', null, formats[1]), ')')
      ),
      ' ',
      React.createElement('select', { className: 'form-control', 'ng-model': 'format', value: format, onChange: function (e) { setFormat(e.target.value); } },
        formats.map(function (f) {
          return React.createElement('option', { key: f, value: f }, f);
        })
      )
    )
  );
}

/* ── Validation States ───────────────────────────────────── */
function ValidationStates() {
  return React.createElement('div', null,
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

/* ── Selects (ui-select replacement) ─────────────────────── */
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

  var standardState = useState('');
  var searchState = useState('');

  return React.createElement('div', { className: 'ng-cloak' },
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
        React.createElement('span', { className: 'ui-select-placeholder' }, !standardState[0] ? 'Standard Select' : standardState[0]),
        React.createElement('select', { className: 'form-control', value: standardState[0], onChange: function (e) { standardState[1](e.target.value); } },
          React.createElement('option', { value: '' }, 'Standard Select'),
          standardSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.label }, item.label);
          })
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
        React.createElement('select', { className: 'form-control', value: searchState[0], onChange: function (e) { searchState[1](e.target.value); } },
          React.createElement('option', { value: '' }, 'Select With Search'),
          selectWithSearchItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.label }, item.label);
          })
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
        React.createElement('select', { className: 'form-control', disabled: true },
          React.createElement('option', { value: '' }, 'Disabled Selection')
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
        React.createElement('select', { className: 'form-control' },
          React.createElement('option', { value: '' }, 'Select With Option Groups'),
          React.createElement('optgroup', { label: 'Group 1' },
            React.createElement('option', null, 'Group 1 - Option 1'),
            React.createElement('option', null, 'Group 1 - Option 3')
          ),
          React.createElement('optgroup', { label: 'Group 2' },
            React.createElement('option', null, 'Group 2 - Option 2'),
            React.createElement('option', null, 'Group 2 - Option 4')
          )
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'btn-group bootstrap-select form-control' },
        React.createElement('select', { className: 'form-control' },
          React.createElement('option', { value: '' }, 'Select With Option Groups Function'),
          React.createElement('optgroup', { label: 'From A - M' },
            React.createElement('option', null, 'Adam'),
            React.createElement('option', null, 'Amalie'),
            React.createElement('option', null, 'Estefan\u00eda'),
            React.createElement('option', null, 'Adrian'),
            React.createElement('option', null, 'Michael')
          ),
          React.createElement('optgroup', { label: 'From N - Z' },
            React.createElement('option', null, 'Wladimir'),
            React.createElement('option', null, 'Samantha'),
            React.createElement('option', null, 'Nicole'),
            React.createElement('option', null, 'Natasha'),
            React.createElement('option', null, 'Nicol\u00e1s')
          )
        )
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control', multiple: true, defaultValue: [] },
        multipleSelectItems.map(function (item) {
          return React.createElement('option', { key: item.value, value: item.label }, item.label);
        })
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('div', { className: 'input-group' },
        React.createElement('select', { className: 'form-control', multiple: true, defaultValue: [] },
          multipleSelectItems.map(function (item) {
            return React.createElement('option', { key: item.value, value: item.label }, item.label);
          })
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

/* ── Old Selects (selectpicker) ──────────────────────────── */
function OldSelectsPanel() {
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

  return React.createElement('div', { ref: containerRef },
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Standard Select' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Standard Select'),
        React.createElement('option', { value: '1' }, 'Option 1'),
        React.createElement('option', { value: '2' }, 'Option 2'),
        React.createElement('option', { value: '3' }, 'Option 3'),
        React.createElement('option', { value: '4' }, 'Option 4')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker with-search', 'data-live-search': 'true', selectpicker: '', title: 'Select With Search' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Select With Search'),
        React.createElement('option', null, 'Hot Dog, Fries and a Soda'),
        React.createElement('option', null, 'Burger, Shake and a Smile'),
        React.createElement('option', null, 'Sugar, Spice and all things nice'),
        React.createElement('option', null, 'Baby Back Ribs')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Option Types' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Option Types'),
        React.createElement('option', null, 'Standard option'),
        React.createElement('option', { 'data-subtext': 'option subtext' }, 'Option with subtext'),
        React.createElement('option', { disabled: true }, 'Disabled Option'),
        React.createElement('option', { 'data-icon': 'glyphicon-heart' }, 'Option with cion')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', disabled: true, selectpicker: '', title: 'Disabled Select' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Disabled Select'),
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Select with Option Groups' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Select with Option Groups'),
            React.createElement('optgroup', { label: 'Group 1' },
              React.createElement('option', null, 'Group 1 - Option 1'),
              React.createElement('option', null, 'Group 1 - Option 3')
            ),
            React.createElement('optgroup', { label: 'Group 2' },
              React.createElement('option', null, 'Group 2 - Option 2'),
              React.createElement('option', null, 'Group 2 - Option 4')
            )
          )
        )
      ),
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', selectpicker: '', title: 'Select with Divider' },
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
      React.createElement('select', { className: 'form-control selectpicker', multiple: true, selectpicker: '', title: 'Multiple Select' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Multiple Select'),
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('select', { className: 'form-control selectpicker', multiple: true, 'data-max-options': '2', selectpicker: '', title: 'Multiple Select with Limit' },
        React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Multiple Select with Limit'),
        React.createElement('option', null, 'Option 1'),
        React.createElement('option', null, 'Option 2'),
        React.createElement('option', null, 'Option 3')
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-primary', 'data-container': 'body', selectpicker: '', title: 'Primary Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Primary Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-success', 'data-container': 'body', selectpicker: '', title: 'Success Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Success Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-warning', 'data-container': 'body', selectpicker: '', title: 'Warning Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Warning Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        )
      ),
      React.createElement('div', { className: 'col-sm-6' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-info', 'data-container': 'body', selectpicker: '', title: 'Info Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Info Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-danger', 'data-container': 'body', selectpicker: '', title: 'Danger Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Danger Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('select', { className: 'form-control selectpicker', 'data-style': 'btn-inverse', 'data-container': 'body', selectpicker: '', title: 'Inverse Select' },
            React.createElement('option', { 'data-hidden': 'true', disabled: true, value: '' }, 'Inverse Select'),
            React.createElement('option', null, 'Option 1'), React.createElement('option', null, 'Option 2'),
            React.createElement('option', null, 'Option 3'), React.createElement('option', null, 'Option 4')
          )
        )
      )
    )
  );
}

/* ── Main Form Inputs Page ───────────────────────────────── */
export function FormInputsPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Standard Fields', panelClass: 'with-scroll', baPanelTitle: 'Standard Fields' },
          React.createElement(StandardFields)
        ),
        React.createElement(Panel, { title: 'Tags Input', panelClass: 'with-scroll', baPanelTitle: 'Tags Input' },
          React.createElement(TagsInput)
        ),
        React.createElement(Panel, { title: 'Input Groups', panelClass: 'with-scroll', baPanelTitle: 'Input Groups' },
          React.createElement(InputGroups)
        ),
        React.createElement(Panel, { title: 'Checkboxes & Radios', panelClass: 'with-scroll', baPanelTitle: 'Checkboxes & Radios' },
          React.createElement(CheckboxesRadios)
        ),
        React.createElement(Panel, { title: 'On/Off Switches', panelClass: 'with-scroll', baPanelTitle: 'On/Off Switches' },
          React.createElement(SwitchesPanel)
        ),
        React.createElement(Panel, { title: 'Old On/Off Switches (Deprecated)', panelClass: 'with-scroll', baPanelTitle: 'Old On/Off Switches (Deprecated)' },
          React.createElement(OldSwitchesPanel)
        ),
        React.createElement(Panel, { title: 'Datepicker', panelClass: 'with-scroll', baPanelTitle: 'Datepicker' },
          React.createElement(DatepickerPanel)
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Validation States', panelClass: 'with-scroll', baPanelTitle: 'Validation States' },
          React.createElement(ValidationStates)
        ),
        React.createElement(Panel, { title: 'Selects', panelClass: 'with-scroll', baPanelTitle: 'Selects' },
          React.createElement(SelectsPanel)
        ),
        React.createElement(Panel, { title: 'Old selects(deprecated)', panelClass: 'with-scroll', baPanelTitle: 'Old selects(deprecated)' },
          React.createElement(OldSelectsPanel)
        )
      )
    )
  );
}
