/**
 * Form Inputs page — React migration of src/app/pages/form/inputs.
 *
 * Reproduces the DOM structure of the original AngularJS templates
 * (standardFields, tagsInput, inputGroups, checkboxesRadios, switches,
 * oldSwitches, datePickers, validationStates, select, oldSelect) so the
 * existing markup, CSS classes and element IDs are preserved.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../../components/Panel';

function StandardFields() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="input01">Text</label>
        <input type="text" className="form-control" id="input01" placeholder="Text" />
      </div>
      <div className="form-group">
        <label htmlFor="input02">Password</label>
        <input type="password" className="form-control" id="input02" placeholder="Password" />
      </div>
      <div className="form-group">
        <label htmlFor="input03">Rounded Corners</label>
        <input type="text" className="form-control form-control-rounded" id="input03" placeholder="Rounded Corners" />
      </div>
      <div className="form-group">
        <label htmlFor="input04">With help</label>
        <input type="text" className="form-control" id="input04" placeholder="With help" />
        <span className="help-block sub-little-text">A block of help text that breaks onto a new line and may extend beyond one line.</span>
      </div>
      <div className="form-group">
        <label htmlFor="input05">Disabled Input</label>
        <input type="text" className="form-control" id="input05" placeholder="Disabled Input" disabled />
      </div>
      <div className="form-group">
        <label htmlFor="textarea01">Textarea</label>
        <textarea placeholder="Default Input" className="form-control" id="textarea01"></textarea>
      </div>
      <div className="form-group">
        <input type="text" className="form-control input-sm" id="input2" placeholder="Small Input" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control input-lg" id="input4" placeholder="Large Input" />
      </div>
    </form>
  );
}

function TagsInput() {
  var containerRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn.tagsinput || !containerRef.current) {
      return undefined;
    }
    var inputs = $(containerRef.current).find('input[data-role="tagsinput"]');
    inputs.each(function () {
      var input = $(this);
      input.tagsinput({
        tagClass: 'label label-' + input.attr('tag-input'),
      });
    });
    return function () {
      inputs.each(function () {
        try {
          $(this).tagsinput('destroy');
        } catch (e) {
          /* plugin not initialized */
        }
      });
    };
  }, []);

  return (
    <div className="form-group" ref={containerRef}>
      <div className="form-group">
        <input type="text" tag-input="primary" defaultValue="Amsterdam,Washington,Sydney,Beijing,Cairo" data-role="tagsinput" placeholder="Add Tag" />
      </div>
      <div className="form-group">
        <input type="text" tag-input="warning" defaultValue="Minsk,Prague,Vilnius,Warsaw" data-role="tagsinput" placeholder="Add Tag" />
      </div>
      <div className="form-group">
        <input type="text" tag-input="danger" defaultValue="London,Berlin,Paris,Rome,Munich" data-role="tagsinput" placeholder="Add Tag" />
      </div>
    </div>
  );
}

function InputGroups() {
  return (
    <div>
      <div className="input-group">
        <span className="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">@</span>
        <input type="text" className="form-control with-primary-addon" placeholder="Username" aria-describedby="basic-addon1" />
      </div>
      <div className="input-group">
        <input type="text" className="form-control with-warning-addon" placeholder="Recipient's username" aria-describedby="basic-addon2" />
        <span className="input-group-addon input-group-addon-warning addon-right" id="basic-addon2">@example.com</span>
      </div>
      <div className="input-group">
        <span className="input-group-addon addon-left input-group-addon-success">$</span>
        <input type="text" className="form-control with-success-addon" aria-label="Amount (to the nearest dollar)" />
        <span className="input-group-addon addon-right input-group-addon-success">.00</span>
      </div>
      <div className="input-group">
        <input type="text" className="form-control with-danger-addon" placeholder="Search for..." />
        <span className="input-group-btn">
          <button className="btn btn-danger" type="button">Go!</button>
        </span>
      </div>
    </div>
  );
}

function CheckboxesRadios() {
  return (
    <div>
      <div className="checkbox-demo-row">
        <div className="input-demo checkbox-demo row">
          <div className="col-md-4">
            <label className="checkbox-inline custom-checkbox nowrap">
              <input type="checkbox" id="inlineCheckbox01" value="option1" />
              <span>Check 1</span>
            </label>
          </div>
          <div className="col-md-4">
            <label className="checkbox-inline custom-checkbox nowrap">
              <input type="checkbox" id="inlineCheckbox02" value="option2" />
              <span>Check 2</span>
            </label>
          </div>
          <div className="col-md-4">
            <label className="checkbox-inline custom-checkbox nowrap">
              <input type="checkbox" id="inlineCheckbox03" value="option3" />
              <span>Check 3</span>
            </label>
          </div>
        </div>
        <div className="input-demo radio-demo row">
          <div className="col-md-4">
            <label className="radio-inline custom-radio nowrap">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <span>Option 1</span>
            </label>
          </div>
          <div className="col-md-4">
            <label className="radio-inline custom-radio nowrap">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <span>Option 2</span>
            </label>
          </div>
          <div className="col-md-4">
            <label className="radio-inline custom-radio nowrap">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
              <span>Option3</span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="checkbox disabled">
          <label className="custom-checkbox nowrap">
            <input type="checkbox" value="" disabled />
            <span>Checkbox is disabled</span>
          </label>
        </div>
        <div className="radio disabled">
          <label className="custom-radio nowrap">
            <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled />
            <span>Disabled option</span>
          </label>
        </div>
      </div>
    </div>
  );
}

var SWITCHER_STATES = [
  { style: 'primary', value: true },
  { style: 'success', value: false },
  { style: 'warning', value: true },
  { style: 'danger', value: true },
  { style: 'info', value: false },
];

function Switches() {
  return (
    <div>
      {SWITCHER_STATES.map(function (s, i) {
        return React.createElement(
          'ba-switcher',
          { key: i },
          React.createElement(
            'label',
            { className: 'switcher-container' },
            React.createElement('input', { type: 'checkbox', defaultChecked: s.value, readOnly: true }),
            React.createElement(
              'div',
              { className: 'switcher ' + s.style },
              React.createElement(
                'div',
                { className: 'handle-container' },
                React.createElement('span', { className: 'handle handle-on' }, 'ON'),
                React.createElement('span', { className: 'handle' }),
                React.createElement('span', { className: 'handle handle-off' }, 'OFF')
              )
            )
          )
        );
      })}
    </div>
  );
}

var OLD_SWITCH_COLORS = ['primary', 'warning', 'danger', 'info', 'success'];

function OldSwitches() {
  var containerRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !containerRef.current) {
      return undefined;
    }
    var inputs = $(containerRef.current).find('input[type="checkbox"]');
    inputs.each(function () {
      var input = $(this);
      input.bootstrapSwitch({
        size: 'small',
        onColor: input.attr('data-color'),
      });
    });
    return function () {
      inputs.each(function () {
        try {
          $(this).bootstrapSwitch('destroy');
        } catch (e) {
          /* plugin not initialized */
        }
      });
    };
  }, []);

  return (
    <div className="switches clearfix" ref={containerRef}>
      {OLD_SWITCH_COLORS.map(function (color, i) {
        return (
          <div className={'switch-container ' + color} key={i}>
            <input type="checkbox" data-color={color} defaultChecked readOnly />
          </div>
        );
      })}
    </div>
  );
}

var CALENDAR_WEEKS = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];

function DatePickers() {
  var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  return (
    <div className="datepicker row">
      <div className="col-xlg-6 col-md-12 col-sm-6">
        <h4>Inline</h4>
        <label>Selected date is: <em></em></label>
        <div className="uib-datepicker-wrap">
          <table role="grid" className="uib-datepicker">
            <thead>
              <tr>
                <th><button type="button" className="btn btn-default btn-sm pull-left"><i className="glyphicon glyphicon-chevron-left"></i></button></th>
                <th colSpan="5"><button type="button" className="btn btn-default btn-sm"><strong>June 2016</strong></button></th>
                <th><button type="button" className="btn btn-default btn-sm pull-right"><i className="glyphicon glyphicon-chevron-right"></i></button></th>
              </tr>
              <tr>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (d) {
                  return <th key={d} className="text-center"><small className="text-muted">{d}</small></th>;
                })}
              </tr>
            </thead>
            <tbody>
              {CALENDAR_WEEKS.map(function (week, wi) {
                return (
                  <tr key={wi}>
                    {week.map(function (day, di) {
                      return (
                        <td key={di} className="text-center">
                          <button type="button" className="btn btn-default btn-sm"><span>{day}</span></button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-xlg-6 col-md-12 col-sm-6">
        <h4>Popup</h4>
        <label>Selected date is: <em></em></label>
        <p className="input-group">
          <input type="text" className="form-control" uib-datepicker-popup="dd-MMMM-yyyy" is-open="false" ng-required="true" close-text="Close" defaultValue="" />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-calendar"></i></button>
          </span>
        </p>
        <label>Format: <span className="muted-text">(manual alternate <em></em>)</span></label>
        <select className="form-control" ng-model="format" defaultValue="">
          <option value=""></option>
          {formats.map(function (f) {
            return <option key={f} value={f}>{f}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

function ValidationStates() {
  return (
    <div>
      <div className="form-group has-success">
        <label className="control-label" htmlFor="inputSuccess1">Input with success</label>
        <input type="text" className="form-control" id="inputSuccess1" />
      </div>
      <div className="form-group has-warning">
        <label className="control-label" htmlFor="inputWarning1">Input with warning</label>
        <input type="text" className="form-control" id="inputWarning1" />
      </div>
      <div className="form-group has-error">
        <label className="control-label" htmlFor="inputError1">Input with error</label>
        <input type="text" className="form-control" id="inputError1" />
      </div>
      <div className="has-success">
        <div className="checkbox">
          <label className="custom-checkbox">
            <input type="checkbox" id="checkboxSuccess" value="option1" />
            <span>Checkbox with success</span>
          </label>
        </div>
      </div>
      <div className="has-warning">
        <div className="checkbox">
          <label className="custom-checkbox">
            <input type="checkbox" id="checkboxWarning" value="option1" />
            <span>Checkbox with warning</span>
          </label>
        </div>
      </div>
      <div className="has-error">
        <div className="checkbox">
          <label className="custom-checkbox">
            <input type="checkbox" id="checkboxError" value="option1" />
            <span>Checkbox with error</span>
          </label>
        </div>
      </div>
      <div className="form-group has-success has-feedback">
        <label className="control-label" htmlFor="inputSuccess2">Input with success</label>
        <input type="text" className="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status" />
        <i className="ion-checkmark-circled form-control-feedback" aria-hidden="true"></i>
        <span id="inputSuccess2Status" className="sr-only">(success)</span>
      </div>
      <div className="form-group has-warning has-feedback">
        <label className="control-label" htmlFor="inputWarning2">Input with warning</label>
        <input type="text" className="form-control" id="inputWarning2" aria-describedby="inputWarning2Status" />
        <i className="ion-alert-circled form-control-feedback" aria-hidden="true"></i>
        <span id="inputWarning2Status" className="sr-only">(warning)</span>
      </div>
      <div className="form-group has-error has-feedback">
        <label className="control-label" htmlFor="inputError2">Input with error</label>
        <input type="text" className="form-control" id="inputError2" aria-describedby="inputError2Status" />
        <i className="ion-android-cancel form-control-feedback" aria-hidden="true"></i>
        <span id="inputError2Status" className="sr-only">(error)</span>
      </div>
      <div className="form-group has-success has-feedback">
        <label className="control-label" htmlFor="inputGroupSuccess1">Input group with success</label>
        <div className="input-group">
          <span className="input-group-addon addon-left">@</span>
          <input type="text" className="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status" />
        </div>
        <i className="ion-checkmark-circled form-control-feedback" aria-hidden="true"></i>
        <span id="inputGroupSuccess1Status" className="sr-only">(success)</span>
      </div>
    </div>
  );
}

var UI_SELECT_PLACEHOLDERS = [
  'Standard Select',
  'Select With Search',
  'Disabled Selection',
  'Select With Option Groups',
  'Select With Option Groups Function',
  'Multiple Select',
  'Select With Clear Button',
];

function Selects() {
  return (
    <div>
      {UI_SELECT_PLACEHOLDERS.map(function (placeholder, i) {
        return (
          <div className="form-group" key={i}>
            <div className="ui-select-container ui-select-bootstrap dropdown btn-group bootstrap-select form-control">
              <div className="ui-select-match">
                <span className="ui-select-placeholder text-muted">{placeholder}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

var OLD_SELECTS = [
  { title: 'Standard Select', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Select With Search', options: ['Option 1', 'Option 2', 'Option 3'], className: 'with-search' },
  { title: 'Option Types', options: ['Standard option', 'Option with subtext', 'Disabled Option'] },
  { title: 'Disabled Select', options: ['Option 1', 'Option 2', 'Option 3'], disabled: true },
];

function OldSelects() {
  var containerRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn.selectpicker || !containerRef.current) {
      return undefined;
    }
    var selects = $(containerRef.current).find('select.selectpicker');
    selects.selectpicker({ dropupAuto: false, hideDisabled: true });
    return function () {
      try {
        selects.selectpicker('destroy');
      } catch (e) {
        /* plugin not initialized */
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      {OLD_SELECTS.map(function (sel, i) {
        return (
          <div className="form-group" key={i}>
            <select
              className={'form-control selectpicker' + (sel.className ? ' ' + sel.className : '')}
              title={sel.title}
              disabled={sel.disabled}
              defaultValue=""
            >
              <option value="" disabled hidden>{sel.title}</option>
              {sel.options.map(function (opt, oi) {
                return <option key={oi} value={opt}>{opt}</option>;
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}

export function FormInputsPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Standard Fields" panelClass="with-scroll"><StandardFields /></Panel>
          <Panel title="Tags Input" panelClass="with-scroll"><TagsInput /></Panel>
          <Panel title="Input Groups" panelClass="with-scroll"><InputGroups /></Panel>
          <Panel title="Checkboxes & Radios" panelClass="with-scroll"><CheckboxesRadios /></Panel>
          <Panel title="On/Off Switches" panelClass="with-scroll"><Switches /></Panel>
          <Panel title="Old On/Off Switches (Deprecated)" panelClass="with-scroll"><OldSwitches /></Panel>
          <Panel title="Datepicker" panelClass="with-scroll"><DatePickers /></Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Validation States" panelClass="with-scroll"><ValidationStates /></Panel>
          <Panel title="Selects" panelClass="with-scroll"><Selects /></Panel>
          <Panel title="Old selects(deprecated)" panelClass="with-scroll"><OldSelects /></Panel>
        </div>
      </div>
    </div>
  );
}
