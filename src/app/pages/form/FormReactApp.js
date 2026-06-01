(function () {
  'use strict';

  var h = React.createElement;

  // ═══════════════════════════════════════════════════════════════
  // Shared utilities
  // ═══════════════════════════════════════════════════════════════

  function Panel(props) {
    return h('div', { className: 'panel panel-blur with-scroll animated zoomIn' },
      h('div', { className: 'panel-heading clearfix' },
        h('h3', { className: 'panel-title' }, props.title)
      ),
      h('div', { className: 'panel-body' }, props.children)
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // Form Inputs Page
  // ═══════════════════════════════════════════════════════════════

  function StandardFields() {
    return h('form', null,
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'input01' }, 'Text'),
        h('input', { type: 'text', className: 'form-control', id: 'input01', placeholder: 'Text', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'input02' }, 'Password'),
        h('input', { type: 'password', className: 'form-control', id: 'input02', placeholder: 'Password', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'input03' }, 'Rounded Corners'),
        h('input', { type: 'text', className: 'form-control form-control-rounded', id: 'input03', placeholder: 'Rounded Corners', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'input04' }, 'With help'),
        h('input', { type: 'text', className: 'form-control', id: 'input04', placeholder: 'With help', defaultValue: '' }),
        h('span', { className: 'help-block sub-little-text' }, 'A block of help text that breaks onto a new line and may extend beyond one line.')
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'input05' }, 'Disabled Input'),
        h('input', { type: 'text', className: 'form-control', id: 'input05', placeholder: 'Disabled Input', disabled: true })
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'textarea01' }, 'Textarea'),
        h('textarea', { placeholder: 'Default Input', className: 'form-control', id: 'textarea01', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('input', { type: 'text', className: 'form-control input-sm', id: 'input2', placeholder: 'Small Input', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('input', { type: 'text', className: 'form-control input-lg', id: 'input4', placeholder: 'Large Input', defaultValue: '' })
      )
    );
  }

  function TagsInput() {
    return h('div', { className: 'form-group' },
      h('div', { className: 'form-group' },
        h('input', { type: 'text', 'data-role': 'tagsinput', defaultValue: 'Amsterdam,Washington,Sydney,Beijing,Cairo', placeholder: 'Add Tag' })
      ),
      h('div', { className: 'form-group' },
        h('input', { type: 'text', 'data-role': 'tagsinput', defaultValue: 'Minsk,Prague,Vilnius,Warsaw', placeholder: 'Add Tag' })
      ),
      h('div', { className: 'form-group' },
        h('input', { type: 'text', 'data-role': 'tagsinput', defaultValue: 'London,Berlin,Paris,Rome,Munich', placeholder: 'Add Tag' })
      )
    );
  }

  function InputGroups() {
    return h('div', null,
      h('div', { className: 'input-group' },
        h('span', { className: 'input-group-addon input-group-addon-primary addon-left', id: 'basic-addon1' }, '@'),
        h('input', { type: 'text', className: 'form-control with-primary-addon', placeholder: 'Username', 'aria-describedby': 'basic-addon1', defaultValue: '' })
      ),
      h('div', { className: 'input-group' },
        h('input', { type: 'text', className: 'form-control with-warning-addon', placeholder: "Recipient's username", 'aria-describedby': 'basic-addon2', defaultValue: '' }),
        h('span', { className: 'input-group-addon input-group-addon-warning addon-right', id: 'basic-addon2' }, '@example.com')
      ),
      h('div', { className: 'input-group' },
        h('span', { className: 'input-group-addon addon-left input-group-addon-success' }, '$'),
        h('input', { type: 'text', className: 'form-control with-success-addon', 'aria-label': 'Amount (to the nearest dollar)', defaultValue: '' }),
        h('span', { className: 'input-group-addon addon-right input-group-addon-success' }, '.00')
      ),
      h('div', { className: 'input-group' },
        h('input', { type: 'text', className: 'form-control with-danger-addon', placeholder: 'Search for...', defaultValue: '' }),
        h('span', { className: 'input-group-btn' },
          h('button', { className: 'btn btn-danger', type: 'button' }, 'Go!')
        )
      )
    );
  }

  function CheckboxesRadios() {
    return h('div', null,
      h('div', { className: 'checkbox-demo-row' },
        h('div', { className: 'input-demo checkbox-demo row' },
          h('div', { className: 'col-md-4' },
            h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              h('input', { type: 'checkbox', id: 'inlineCheckbox01', defaultValue: 'option1' }),
              h('span', null, 'Check 1')
            )
          ),
          h('div', { className: 'col-md-4' },
            h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              h('input', { type: 'checkbox', id: 'inlineCheckbox02', defaultValue: 'option2' }),
              h('span', null, 'Check 2')
            )
          ),
          h('div', { className: 'col-md-4' },
            h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
              h('input', { type: 'checkbox', id: 'inlineCheckbox03', defaultValue: 'option3' }),
              h('span', null, 'Check 3')
            )
          )
        ),
        h('div', { className: 'input-demo radio-demo row' },
          h('div', { className: 'col-md-4' },
            h('label', { className: 'radio-inline custom-radio nowrap' },
              h('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio1', defaultValue: 'option1' }),
              h('span', null, 'Option 1')
            )
          ),
          h('div', { className: 'col-md-4' },
            h('label', { className: 'radio-inline custom-radio nowrap' },
              h('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio2', defaultValue: 'option2' }),
              h('span', null, 'Option 2')
            )
          ),
          h('div', { className: 'col-md-4' },
            h('label', { className: 'radio-inline custom-radio nowrap' },
              h('input', { type: 'radio', name: 'inlineRadioOptions', id: 'inlineRadio3', defaultValue: 'option3' }),
              h('span', null, 'Option3')
            )
          )
        )
      ),
      h('div', null,
        h('div', { className: 'checkbox disabled' },
          h('label', { className: 'custom-checkbox nowrap' },
            h('input', { type: 'checkbox', defaultValue: '', disabled: true }),
            h('span', null, 'Checkbox is disabled')
          )
        ),
        h('div', { className: 'radio disabled' },
          h('label', { className: 'custom-radio nowrap' },
            h('input', { type: 'radio', name: 'optionsRadios', id: 'optionsRadios3', defaultValue: 'option3', disabled: true }),
            h('span', null, 'Disabled option')
          )
        )
      )
    );
  }

  function BaSwitcher(props) {
    return h('label', { className: 'switcher-container' },
      h('input', { type: 'checkbox', checked: props.value, readOnly: true }),
      h('div', { className: 'switcher ' + props.style, onClick: function () { if (props.onToggle) props.onToggle(); } },
        h('div', { className: 'handle-container' },
          h('span', { className: 'handle handle-on' }, 'ON'),
          h('span', { className: 'handle' }),
          h('span', { className: 'handle handle-off' }, 'OFF')
        )
      )
    );
  }

  function SwitchesPanel() {
    var _React$useState = React.useState({ s1: true, s2: false, s3: true, s4: true, s5: false });
    var switches = _React$useState[0];
    var setSwitches = _React$useState[1];

    function toggle(key) {
      setSwitches(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[key] = !prev[key];
        return next;
      });
    }

    return h('div', null,
      h(BaSwitcher, { style: 'primary', value: switches.s1, onToggle: function () { toggle('s1'); } }),
      h(BaSwitcher, { style: 'success', value: switches.s2, onToggle: function () { toggle('s2'); } }),
      h(BaSwitcher, { style: 'warning', value: switches.s3, onToggle: function () { toggle('s3'); } }),
      h(BaSwitcher, { style: 'danger', value: switches.s4, onToggle: function () { toggle('s4'); } }),
      h(BaSwitcher, { style: 'info', value: switches.s5, onToggle: function () { toggle('s5'); } })
    );
  }

  function OldSwitch(props) {
    return h('div', {
      className: 'switch-container ' + props.color,
      onClick: function () { if (props.onToggle) props.onToggle(); }
    },
      h('input', { type: 'checkbox', checked: props.value, readOnly: true })
    );
  }

  function OldSwitchesPanel() {
    var _React$useState2 = React.useState({ primary: true, warning: true, danger: true, info: true, success: true });
    var vals = _React$useState2[0];
    var setVals = _React$useState2[1];

    function toggle(key) {
      setVals(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[key] = !prev[key];
        return next;
      });
    }

    return h('div', { className: 'switches clearfix' },
      h(OldSwitch, { color: 'primary', value: vals.primary, onToggle: function () { toggle('primary'); } }),
      h(OldSwitch, { color: 'warning', value: vals.warning, onToggle: function () { toggle('warning'); } }),
      h(OldSwitch, { color: 'danger', value: vals.danger, onToggle: function () { toggle('danger'); } }),
      h(OldSwitch, { color: 'info', value: vals.info, onToggle: function () { toggle('info'); } }),
      h(OldSwitch, { color: 'success', value: vals.success, onToggle: function () { toggle('success'); } })
    );
  }

  function ValidationStates() {
    return h('div', null,
      h('div', { className: 'form-group has-success' },
        h('label', { className: 'control-label', htmlFor: 'inputSuccess1' }, 'Input with success'),
        h('input', { type: 'text', className: 'form-control', id: 'inputSuccess1', defaultValue: '' })
      ),
      h('div', { className: 'form-group has-warning' },
        h('label', { className: 'control-label', htmlFor: 'inputWarning1' }, 'Input with warning'),
        h('input', { type: 'text', className: 'form-control', id: 'inputWarning1', defaultValue: '' })
      ),
      h('div', { className: 'form-group has-error' },
        h('label', { className: 'control-label', htmlFor: 'inputError1' }, 'Input with error'),
        h('input', { type: 'text', className: 'form-control', id: 'inputError1', defaultValue: '' })
      ),
      h('div', { className: 'has-success' },
        h('div', { className: 'checkbox' },
          h('label', { className: 'custom-checkbox' },
            h('input', { type: 'checkbox', id: 'checkboxSuccess', defaultValue: 'option1' }),
            h('span', null, 'Checkbox with success')
          )
        )
      ),
      h('div', { className: 'has-warning' },
        h('div', { className: 'checkbox' },
          h('label', { className: 'custom-checkbox' },
            h('input', { type: 'checkbox', id: 'checkboxWarning', defaultValue: 'option1' }),
            h('span', null, 'Checkbox with warning')
          )
        )
      ),
      h('div', { className: 'has-error' },
        h('div', { className: 'checkbox' },
          h('label', { className: 'custom-checkbox' },
            h('input', { type: 'checkbox', id: 'checkboxError', defaultValue: 'option1' }),
            h('span', null, 'Checkbox with error')
          )
        )
      ),
      h('div', { className: 'form-group has-success has-feedback' },
        h('label', { className: 'control-label', htmlFor: 'inputSuccess2' }, 'Input with success'),
        h('input', { type: 'text', className: 'form-control', id: 'inputSuccess2', 'aria-describedby': 'inputSuccess2Status', defaultValue: '' }),
        h('i', { className: 'ion-checkmark-circled form-control-feedback', 'aria-hidden': 'true' }),
        h('span', { id: 'inputSuccess2Status', className: 'sr-only' }, '(success)')
      ),
      h('div', { className: 'form-group has-warning has-feedback' },
        h('label', { className: 'control-label', htmlFor: 'inputWarning2' }, 'Input with warning'),
        h('input', { type: 'text', className: 'form-control', id: 'inputWarning2', 'aria-describedby': 'inputWarning2Status', defaultValue: '' }),
        h('i', { className: 'ion-alert-circled form-control-feedback', 'aria-hidden': 'true' }),
        h('span', { id: 'inputWarning2Status', className: 'sr-only' }, '(warning)')
      ),
      h('div', { className: 'form-group has-error has-feedback' },
        h('label', { className: 'control-label', htmlFor: 'inputError2' }, 'Input with error'),
        h('input', { type: 'text', className: 'form-control', id: 'inputError2', 'aria-describedby': 'inputError2Status', defaultValue: '' }),
        h('i', { className: 'ion-android-cancel form-control-feedback', 'aria-hidden': 'true' }),
        h('span', { id: 'inputError2Status', className: 'sr-only' }, '(error)')
      ),
      h('div', { className: 'form-group has-success has-feedback' },
        h('label', { className: 'control-label', htmlFor: 'inputGroupSuccess1' }, 'Input group with success'),
        h('div', { className: 'input-group' },
          h('span', { className: 'input-group-addon addon-left' }, '@'),
          h('input', { type: 'text', className: 'form-control', id: 'inputGroupSuccess1', 'aria-describedby': 'inputGroupSuccess1Status', defaultValue: '' })
        ),
        h('i', { className: 'ion-checkmark-circled form-control-feedback', 'aria-hidden': 'true' }),
        h('span', { id: 'inputGroupSuccess1Status', className: 'sr-only' }, '(success)')
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
    var withSearchItems = [
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

    return h('div', null,
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Standard Select'),
          standardSelectItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Select With Search'),
          withSearchItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', disabled: true, defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Disabled Selection')
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Select With Option Groups'),
          h('optgroup', { label: 'Group 1' },
            groupedSelectItems.filter(function (i) { return i.group === 'Group 1'; }).map(function (item) {
              return h('option', { key: item.value, value: item.value }, item.label);
            })
          ),
          h('optgroup', { label: 'Group 2' },
            groupedSelectItems.filter(function (i) { return i.group === 'Group 2'; }).map(function (item) {
              return h('option', { key: item.value, value: item.value }, item.label);
            })
          )
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Select With Option Groups Function'),
          h('optgroup', { label: 'From A - M' },
            groupedBySelectItems.filter(function (i) { return i.name[0] >= 'A' && i.name[0] <= 'M'; }).map(function (item, idx) {
              return h('option', { key: idx, value: item.name }, item.name);
            })
          ),
          h('optgroup', { label: 'From N - Z' },
            groupedBySelectItems.filter(function (i) { return i.name[0] >= 'N' && i.name[0] <= 'Z'; }).map(function (item, idx) {
              return h('option', { key: idx, value: item.name }, item.name);
            })
          )
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', multiple: true, defaultValue: [] },
          multipleSelectItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('div', { className: 'input-group' },
          h('select', { className: 'form-control', multiple: true, defaultValue: [] },
            multipleSelectItems.map(function (item) {
              return h('option', { key: item.value, value: item.value }, item.label);
            })
          ),
          h('span', { className: 'input-group-btn' },
            h('button', { type: 'button', className: 'btn btn-danger' },
              h('span', { className: 'glyphicon glyphicon-trash' })
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

    return h('div', null,
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Standard Select'),
          standardSelectItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Select With Search'),
          selectWithSearchItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Option Types'),
          h('option', null, 'Standard option'),
          h('option', null, 'Option with subtext'),
          h('option', { disabled: true }, 'Disabled Option'),
          h('option', null, 'Option with cion')
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', disabled: true, defaultValue: '' },
          h('option', { value: '', disabled: true }, 'Disabled Select'),
          h('option', null, 'Option 1'),
          h('option', null, 'Option 2'),
          h('option', null, 'Option 3')
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Select with Option Groups'),
              h('optgroup', { label: 'Group 1' },
                groupedSelectItems.filter(function (i) { return i.group === 'Group 1'; }).map(function (item) {
                  return h('option', { key: item.value, value: item.value }, item.label);
                })
              ),
              h('optgroup', { label: 'Group 2' },
                groupedSelectItems.filter(function (i) { return i.group === 'Group 2'; }).map(function (item) {
                  return h('option', { key: item.value, value: item.value }, item.label);
                })
              )
            )
          )
        ),
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Select with Divider'),
              h('option', null, 'Group 1 - Option 1'),
              h('option', null, 'Group 1 - Option 2'),
              h('option', null, 'Group 2 - Option 1'),
              h('option', null, 'Group 2 - Option 2')
            )
          )
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', multiple: true, defaultValue: [] },
          standardSelectItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'form-group' },
        h('select', { className: 'form-control', multiple: true, defaultValue: [] },
          standardSelectItems.map(function (item) {
            return h('option', { key: item.value, value: item.value }, item.label);
          })
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Primary Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          ),
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Success Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          ),
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Warning Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          )
        ),
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Info Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          ),
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Danger Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          ),
          h('div', { className: 'form-group' },
            h('select', { className: 'form-control', defaultValue: '' },
              h('option', { value: '', disabled: true }, 'Inverse Select'),
              h('option', null, 'Option 1'),
              h('option', null, 'Option 2'),
              h('option', null, 'Option 3'),
              h('option', null, 'Option 4')
            )
          )
        )
      )
    );
  }

  function DatepickerInline() {
    var _dt = React.useState(function () { return new Date(); });
    var dt = _dt[0];
    var setDt = _dt[1];
    var _month = React.useState(function () { return new Date(dt.getFullYear(), dt.getMonth(), 1); });
    var viewDate = _month[0];
    var setViewDate = _month[1];

    var year = viewDate.getFullYear();
    var month = viewDate.getMonth();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getDay();
    var days = [];
    var prevMonthDays = new Date(year, month, 0).getDate();
    for (var i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, current: false });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, current: true });
    }
    while (days.length < 42) {
      days.push({ day: days.length - firstDay - daysInMonth + 1, current: false });
    }

    var weeks = [];
    for (var w = 0; w < 6; w++) {
      weeks.push(days.slice(w * 7, w * 7 + 7));
    }

    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var fullDateStr = dayLabels[dt.getDay()] + ', ' + monthNames[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();

    return h('div', null,
      h('h4', null, 'Inline'),
      h('label', null, 'Selected date is: ', h('em', null, fullDateStr)),
      h('div', { className: 'uib-datepicker-wrap' },
        h('table', { className: 'uib-datepicker', tabIndex: 0, role: 'grid' },
          h('thead', null,
            h('tr', null,
              h('th', null, h('button', { type: 'button', tabIndex: -1, onClick: function () { setViewDate(new Date(year, month - 1, 1)); } }, '<')),
              h('th', { colSpan: 5 }, h('button', { type: 'button', tabIndex: -1 }, h('strong', null, monthNames[month] + ' ' + year))),
              h('th', null, h('button', { type: 'button', tabIndex: -1, onClick: function () { setViewDate(new Date(year, month + 1, 1)); } }, '>'))
            ),
            h('tr', null,
              dayNames.map(function (dn, idx) {
                return h('th', { key: idx }, h('small', { 'aria-label': dayLabels[idx] }, dn));
              })
            )
          ),
          h('tbody', null,
            weeks.map(function (week, wi) {
              return h('tr', { key: wi },
                week.map(function (cell, ci) {
                  var isSelected = cell.current && cell.day === dt.getDate() && month === dt.getMonth() && year === dt.getFullYear();
                  return h('td', { key: ci, className: isSelected ? 'active' : (cell.current ? '' : 'text-muted') },
                    h('button', {
                      type: 'button',
                      tabIndex: -1,
                      className: isSelected ? 'btn btn-sm btn-info' : 'btn btn-sm btn-default',
                      onClick: function () {
                        if (cell.current) {
                          setDt(new Date(year, month, cell.day));
                        }
                      }
                    }, cell.day)
                  );
                })
              );
            })
          )
        )
      )
    );
  }

  function DatepickerPopup() {
    var _dt = React.useState(function () { return new Date(); });
    var dt = _dt[0];
    var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    var _format = React.useState(formats[0]);
    var format = _format[0];
    var setFormat = _format[1];

    var dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var fullDateStr = dayLabels[dt.getDay()] + ', ' + monthNames[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();

    return h('div', null,
      h('h4', null, 'Popup'),
      h('label', null, 'Selected date is: ', h('em', null, fullDateStr)),
      h('p', { className: 'input-group' },
        h('input', { type: 'text', className: 'form-control', defaultValue: fullDateStr }),
        h('span', { className: 'input-group-btn' },
          h('button', { type: 'button', className: 'btn btn-default' },
            h('i', { className: 'glyphicon glyphicon-calendar' })
          )
        )
      ),
      h('label', null, 'Format: ',
        h('span', { className: 'muted-text' }, '(manual alternate ', h('em', null, formats[0]), ')')
      ),
      ' ',
      h('select', { className: 'form-control', value: format, onChange: function (e) { setFormat(e.target.value); } },
        formats.map(function (f) { return h('option', { key: f, value: f }, f); })
      )
    );
  }

  function FormInputsPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Standard Fields' }, h(StandardFields)),
          h(Panel, { title: 'Tags Input' }, h(TagsInput)),
          h(Panel, { title: 'Input Groups' }, h(InputGroups)),
          h(Panel, { title: 'Checkboxes & Radios' }, h(CheckboxesRadios)),
          h(Panel, { title: 'On/Off Switches' }, h(SwitchesPanel)),
          h(Panel, { title: 'Old On/Off Switches (Deprecated)' }, h(OldSwitchesPanel)),
          h(Panel, { title: 'Datepicker' },
            h('div', { className: 'datepicker row' },
              h('div', { className: 'col-xlg-6 col-md-12 col-sm-6' }, h(DatepickerInline)),
              h('div', { className: 'col-xlg-6 col-md-12 col-sm-6' }, h(DatepickerPopup))
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Validation States' }, h(ValidationStates)),
          h(Panel, { title: 'Selects' }, h(SelectsPanel)),
          h(Panel, { title: 'Old selects(deprecated)' }, h(OldSelectsPanel))
        )
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // Form Layouts Page
  // ═══════════════════════════════════════════════════════════════

  function InlineForm() {
    return h('form', { className: 'row form-inline' },
      h('div', { className: 'form-group col-sm-3 col-xs-6' },
        h('input', { type: 'text', className: 'form-control', id: 'exampleInputName2', placeholder: 'Name', defaultValue: '' })
      ),
      h('div', { className: 'form-group col-sm-3 col-xs-6' },
        h('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail2', placeholder: 'Email', defaultValue: '' })
      ),
      h('div', { className: 'checkbox' },
        h('label', { className: 'custom-checkbox' },
          h('input', { type: 'checkbox' }),
          h('span', null, 'Remember me')
        )
      ),
      h('button', { type: 'submit', className: 'btn btn-primary' }, 'Send invitation')
    );
  }

  function BasicForm() {
    return h('form', null,
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
        h('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail1', placeholder: 'Email', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
        h('input', { type: 'password', className: 'form-control', id: 'exampleInputPassword1', placeholder: 'Password', defaultValue: '' })
      ),
      h('div', { className: 'checkbox' },
        h('label', { className: 'custom-checkbox' },
          h('input', { type: 'checkbox' }),
          h('span', null, 'Check me out')
        )
      ),
      h('button', { type: 'submit', className: 'btn btn-danger' }, 'Submit')
    );
  }

  function HorizontalForm() {
    return h('form', { className: 'form-horizontal' },
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'inputEmail3', className: 'col-sm-2 control-label' }, 'Email'),
        h('div', { className: 'col-sm-10' },
          h('input', { type: 'email', className: 'form-control', id: 'inputEmail3', placeholder: 'Email', defaultValue: '' })
        )
      ),
      h('div', { className: 'form-group' },
        h('label', { htmlFor: 'inputPassword3', className: 'col-sm-2 control-label' }, 'Password'),
        h('div', { className: 'col-sm-10' },
          h('input', { type: 'password', className: 'form-control', id: 'inputPassword3', placeholder: 'Password', defaultValue: '' })
        )
      ),
      h('div', { className: 'form-group' },
        h('div', { className: 'col-sm-offset-2 col-sm-10' },
          h('div', { className: 'checkbox' },
            h('label', { className: 'custom-checkbox' },
              h('input', { type: 'checkbox' }),
              h('span', null, 'Remember me')
            )
          )
        )
      ),
      h('div', { className: 'form-group' },
        h('div', { className: 'col-sm-offset-2 col-sm-10' },
          h('button', { type: 'submit', className: 'btn btn-warning' }, 'Sign in')
        )
      )
    );
  }

  function FormWithoutLabels() {
    return h('form', null,
      h('div', { className: 'form-group' },
        h('input', { type: 'text', className: 'form-control', placeholder: 'Recipients', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('input', { type: 'text', className: 'form-control', placeholder: 'Subject', defaultValue: '' })
      ),
      h('div', { className: 'form-group' },
        h('textarea', { className: 'form-control', placeholder: 'Message', defaultValue: '' })
      ),
      h('button', { type: 'submit', className: 'btn btn-success' }, 'Send')
    );
  }

  function BlockForm() {
    return h('div', null,
      h('div', { className: 'row' },
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('label', { htmlFor: 'inputFirstName' }, 'First Name'),
            h('input', { type: 'text', className: 'form-control', id: 'inputFirstName', placeholder: 'First Name', defaultValue: '' })
          )
        ),
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('label', { htmlFor: 'inputLastName' }, 'Last Name'),
            h('input', { type: 'text', className: 'form-control', id: 'inputLastName', placeholder: 'Last Name', defaultValue: '' })
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('label', { htmlFor: 'inputEmail' }, 'Email'),
            h('input', { type: 'email', className: 'form-control', id: 'inputEmail', placeholder: 'Email', defaultValue: '' })
          )
        ),
        h('div', { className: 'col-sm-6' },
          h('div', { className: 'form-group' },
            h('label', { htmlFor: 'inputWebsite' }, 'Website'),
            h('input', { type: 'text', className: 'form-control', id: 'inputWebsite', placeholder: 'Website', defaultValue: '' })
          )
        )
      ),
      h('button', { type: 'submit', className: 'btn btn-primary' }, 'Submit')
    );
  }

  function FormLayoutsPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Inline Form' }, h(InlineForm))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Basic Form' }, h(BasicForm)),
          h(Panel, { title: 'Horizontal Form' }, h(HorizontalForm))
        ),
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Form Without Labels' }, h(FormWithoutLabels)),
          h(Panel, { title: 'Block Form' }, h(BlockForm))
        )
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // Form Wizard Page
  // ═══════════════════════════════════════════════════════════════

  function FormWizardPage() {
    var _tabNum = React.useState(0);
    var tabNum = _tabNum[0];
    var setTabNum = _tabNum[1];
    var _submitted = React.useState({});
    var submitted = _submitted[0];
    var setSubmitted = _submitted[1];

    var _personalInfo = React.useState({ username: '', email: '', password: '', confirmPassword: '' });
    var personalInfo = _personalInfo[0];
    var setPersonalInfo = _personalInfo[1];

    var _productInfo = React.useState({ productName: '', productId: '' });
    var productInfo = _productInfo[0];
    var setProductInfo = _productInfo[1];

    var _shipment = React.useState({ address: '' });
    var shipment = _shipment[0];
    var setShipment = _shipment[1];

    var tabs = [
      { title: 'Personal info' },
      { title: 'Product Info' },
      { title: 'Shipment' },
      { title: 'Finish' }
    ];

    var progress = ((tabNum + 1) / tabs.length) * 100;

    function isStepValid(stepIndex) {
      if (stepIndex === 0) {
        return personalInfo.username && personalInfo.email && personalInfo.password && personalInfo.confirmPassword && personalInfo.password === personalInfo.confirmPassword;
      }
      if (stepIndex === 1) {
        return productInfo.productName && productInfo.productId;
      }
      if (stepIndex === 2) {
        return shipment.address;
      }
      return true;
    }

    function selectTab(idx) {
      setSubmitted(function (prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[tabNum] = true; return n; });
      var canGo = true;
      for (var i = 0; i < idx; i++) {
        if (!isStepValid(i)) { canGo = false; break; }
      }
      if (canGo) setTabNum(idx);
    }

    function nextTab() { selectTab(tabNum + 1); }
    function previousTab() { selectTab(tabNum - 1); }

    function updatePersonal(field, value) {
      setPersonalInfo(function (prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[field] = value; return n; });
    }
    function updateProduct(field, value) {
      setProductInfo(function (prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[field] = value; return n; });
    }
    function updateShipment(field, value) {
      setShipment(function (prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[field] = value; return n; });
    }

    var personalInvalid = submitted[0] || false;
    var productInvalid = submitted[1] || false;
    var shipmentInvalid = submitted[2] || false;

    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Form Wizard' },
            h('div', { className: 'ba-wizard' },
              h('div', { className: 'ba-wizard-navigation-container' },
                tabs.map(function (t, i) {
                  return h('div', {
                    key: i,
                    className: 'ba-wizard-navigation' + (tabNum === i ? ' active' : ''),
                    onClick: function () { selectTab(i); }
                  }, t.title);
                })
              ),
              h('div', { className: 'progress ba-wizard-progress' },
                h('div', {
                  className: 'progress-bar progress-bar-danger active',
                  role: 'progressbar',
                  'aria-valuemin': '0',
                  'aria-valuemax': '100',
                  style: { width: progress + '%' }
                })
              ),
              h('div', { className: 'steps' },
                // Step 1 - Personal Info
                tabNum === 0 ? h('section', { className: 'step' },
                  h('form', { name: 'vm.personalInfoForm', noValidate: true },
                    h('div', { className: 'row' },
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group has-feedback' + (personalInvalid && !personalInfo.username ? ' has-error' : '') },
                          h('label', { htmlFor: 'exampleUsername1' }, 'Username'),
                          h('input', { type: 'text', className: 'form-control', id: 'exampleUsername1', name: 'username', placeholder: 'Username', value: personalInfo.username, onChange: function (e) { updatePersonal('username', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        h('div', { className: 'form-group' + (personalInvalid && !personalInfo.email ? ' has-error' : '') },
                          h('label', { htmlFor: 'exampleInputEmail1' }, 'Email address'),
                          h('input', { type: 'email', className: 'form-control', id: 'exampleInputEmail1', name: 'email', placeholder: 'Email', value: personalInfo.email, onChange: function (e) { updatePersonal('email', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Proper email required')
                        )
                      ),
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group' + (personalInvalid && !personalInfo.password ? ' has-error' : '') },
                          h('label', { htmlFor: 'exampleInputPassword1' }, 'Password'),
                          h('input', { type: 'password', className: 'form-control', id: 'exampleInputPassword1', name: 'password', placeholder: 'Password', value: personalInfo.password, onChange: function (e) { updatePersonal('password', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        h('div', { className: 'form-group' + (personalInvalid && personalInfo.password !== personalInfo.confirmPassword ? ' has-error' : '') },
                          h('label', { htmlFor: 'exampleInputConfirmPassword1' }, 'Confirm Password'),
                          h('input', { type: 'password', className: 'form-control', id: 'exampleInputConfirmPassword1', name: 'confirmPassword', placeholder: 'Confirm Password', value: personalInfo.confirmPassword, onChange: function (e) { updatePersonal('confirmPassword', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Passwords should match')
                        )
                      )
                    )
                  )
                ) : null,

                // Step 2 - Product Info
                tabNum === 1 ? h('section', { className: 'step' },
                  h('form', { name: 'vm.productInfoForm', noValidate: true },
                    h('div', { className: 'row' },
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group has-feedback' + (productInvalid && !productInfo.productName ? ' has-error' : '') },
                          h('label', { htmlFor: 'productName' }, 'Product name'),
                          h('input', { type: 'text', className: 'form-control', id: 'productName', name: 'productName', placeholder: 'Product name', value: productInfo.productName, onChange: function (e) { updateProduct('productName', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Required')
                        ),
                        h('div', { className: 'form-group' + (productInvalid && !productInfo.productId ? ' has-error' : '') },
                          h('label', { htmlFor: 'productId' }, 'Product id'),
                          h('input', { type: 'text', className: 'form-control', id: 'productId', name: 'productId', placeholder: 'productId', value: productInfo.productId, onChange: function (e) { updateProduct('productId', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Required')
                        )
                      ),
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group' },
                          h('label', { htmlFor: 'productName' }, 'Category'),
                          h('select', { className: 'form-control', defaultValue: 'Electronics' },
                            h('option', null, 'Electronics'),
                            h('option', null, 'Toys'),
                            h('option', null, 'Accessories')
                          )
                        )
                      )
                    )
                  )
                ) : null,

                // Step 3 - Shipment
                tabNum === 2 ? h('section', { className: 'step' },
                  h('form', { name: 'vm.addressForm', noValidate: true },
                    h('div', { className: 'row' },
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group has-feedback' + (shipmentInvalid && !shipment.address ? ' has-error' : '') },
                          h('label', { htmlFor: 'address' }, 'Shipment address'),
                          h('input', { type: 'text', className: 'form-control', id: 'address', name: 'address', placeholder: 'Shipment address', value: shipment.address, onChange: function (e) { updateShipment('address', e.target.value); } }),
                          h('span', { className: 'help-block error-block basic-block' }, 'Required')
                        )
                      ),
                      h('div', { className: 'col-md-6' },
                        h('div', { className: 'form-group' },
                          h('label', { htmlFor: 'productName' }, 'Shipment method'),
                          h('select', { className: 'form-control', defaultValue: 'Fast & expensive' },
                            h('option', null, 'Fast & expensive'),
                            h('option', null, 'Cheap & free')
                          )
                        )
                      )
                    ),
                    h('div', { className: 'checkbox' },
                      h('label', { className: 'custom-checkbox' },
                        h('input', { type: 'checkbox' }),
                        h('span', null, 'Save shipment info')
                      )
                    )
                  )
                ) : null,

                // Step 4 - Finish
                tabNum === 3 ? h('section', { className: 'step' },
                  h('form', { className: 'form-horizontal', name: 'vm.finishForm', noValidate: true },
                    'Congratulations! You have successfully filled the form!'
                  )
                ) : null
              ),
              h('nav', null,
                h('ul', { className: 'pager ba-wizard-pager' },
                  h('li', { className: 'previous' },
                    h('button', {
                      disabled: tabNum === 0,
                      onClick: previousTab,
                      type: 'button',
                      className: 'btn btn-primary'
                    }, h('span', { 'aria-hidden': 'true' }, '\u2190'), ' previous')
                  ),
                  h('li', { className: 'next' },
                    h('button', {
                      disabled: tabNum === tabs.length - 1,
                      onClick: nextTab,
                      type: 'button',
                      className: 'btn btn-primary'
                    }, 'next ', h('span', { 'aria-hidden': 'true' }, '\u2192'))
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // HashRouter + App
  // ═══════════════════════════════════════════════════════════════

  function getFormRoute() {
    var hash = window.location.hash || '';
    if (hash.indexOf('#/form/inputs') === 0) return 'inputs';
    if (hash.indexOf('#/form/layouts') === 0) return 'layouts';
    if (hash.indexOf('#/form/wizard') === 0) return 'wizard';
    return 'inputs';
  }

  function App() {
    var _route = React.useState(getFormRoute);
    var route = _route[0];
    var setRoute = _route[1];

    React.useEffect(function () {
      function onHashChange() {
        setRoute(getFormRoute());
      }
      window.addEventListener('hashchange', onHashChange);
      return function () {
        window.removeEventListener('hashchange', onHashChange);
      };
    }, []);

    if (route === 'inputs') return h(FormInputsPage);
    if (route === 'layouts') return h(FormLayoutsPage);
    if (route === 'wizard') return h(FormWizardPage);
    return h(FormInputsPage);
  }

  // ═══════════════════════════════════════════════════════════════
  // Mount / Unmount API
  // ═══════════════════════════════════════════════════════════════

  var mountEl = null;

  window.mountFormReact = function (element) {
    mountEl = element;
    ReactDOM.render(h(App), element);
  };

  window.unmountFormReact = function () {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };

})();
