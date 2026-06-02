/**
 * FormInputsPage — React migration of src/app/pages/form/inputs/.
 *
 * Mirrors the DOM produced by the AngularJS inputs.html and its widget
 * partials. jQuery plugins (bootstrap-tagsinput, bootstrap-switch) are
 * initialized in effects, matching the original tagInput / switch directives.
 */
import React, { useState, useEffect, useRef } from 'react';
import { PanelBox } from './PanelBox';

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
  var refs = [useRef(null), useRef(null), useRef(null)];
  var colors = ['primary', 'warning', 'danger'];

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn || !$.fn.tagsinput) {
      return undefined;
    }
    refs.forEach(function (ref, i) {
      if (ref.current) {
        $(ref.current).tagsinput({ tagClass: 'label label-' + colors[i] });
      }
    });
    return function () {
      refs.forEach(function (ref) {
        try {
          if (ref.current) {
            $(ref.current).tagsinput('destroy');
          }
        } catch (e) { /* noop */ }
      });
    };
  }, []);

  return (
    <div className="form-group">
      <div className="form-group">
        <input ref={refs[0]} type="text" tag-input="primary" defaultValue="Amsterdam,Washington,Sydney,Beijing,Cairo" data-role="tagsinput" placeholder="Add Tag" />
      </div>
      <div className="form-group">
        <input ref={refs[1]} type="text" tag-input="warning" defaultValue="Minsk,Prague,Vilnius,Warsaw" data-role="tagsinput" placeholder="Add Tag" />
      </div>
      <div className="form-group">
        <input ref={refs[2]} type="text" tag-input="danger" defaultValue="London,Berlin,Paris,Rome,Munich" data-role="tagsinput" placeholder="Add Tag" />
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

function Switcher({ style, checked, onChange }) {
  return (
    <ba-switcher switcher-style={style}>
      <label className="switcher-container">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div className={'switcher ' + style}>
          <div className="handle-container">
            <span className="handle handle-on">ON</span>
            <span className="handle"></span>
            <span className="handle handle-off">OFF</span>
          </div>
        </div>
      </label>
    </ba-switcher>
  );
}

function Switches() {
  var [switches, setSwitches] = useState({ s1: true, s2: false, s3: true, s4: true, s5: false });
  var update = function (key) {
    return function (e) {
      var checked = e.target.checked;
      setSwitches(function (prev) {
        var next = Object.assign({}, prev);
        next[key] = checked;
        return next;
      });
    };
  };
  return (
    <div>
      <Switcher style="primary" checked={switches.s1} onChange={update('s1')} />
      <Switcher style="success" checked={switches.s2} onChange={update('s2')} />
      <Switcher style="warning" checked={switches.s3} onChange={update('s3')} />
      <Switcher style="danger" checked={switches.s4} onChange={update('s4')} />
      <Switcher style="info" checked={switches.s5} onChange={update('s5')} />
    </div>
  );
}

function OldSwitches() {
  var containerRef = useRef(null);
  var colors = ['primary', 'warning', 'danger', 'info', 'success'];

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn || !$.fn.bootstrapSwitch) {
      return undefined;
    }
    var inputs = $(containerRef.current).find('input[type="checkbox"]');
    inputs.each(function (i, el) {
      $(el).bootstrapSwitch({ size: 'small', onColor: colors[i] });
    });
    return function () {
      try {
        inputs.bootstrapSwitch('destroy');
      } catch (e) { /* noop */ }
    };
  }, []);

  return (
    <div ref={containerRef} className="switches clearfix">
      {colors.map(function (color) {
        return (
          <div key={color} className={'switch-container ' + color}>
            <input type="checkbox" defaultChecked />
          </div>
        );
      })}
    </div>
  );
}

function InlineDatepicker() {
  // Static representation of the uib-datepicker inline calendar grid.
  var weeks = [
    [29, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
  ];
  var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return (
    <div className="uib-datepicker-wrap">
      <table role="grid" className="uib-datepicker uib-daypicker">
        <thead>
          <tr>
            <th colSpan="7"><button type="button" className="btn btn-default btn-sm">June 2016</button></th>
          </tr>
          <tr>
            {days.map(function (d) { return <th key={d} className="text-center"><small aria-label={d}>{d}</small></th>; })}
          </tr>
        </thead>
        <tbody>
          {weeks.map(function (week, wi) {
            return (
              <tr key={wi}>
                {week.map(function (day, di) {
                  return (
                    <td key={di} className="text-center" role="gridcell">
                      <button type="button" className="btn btn-default btn-sm">
                        <span>{day}</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Datepickers() {
  var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  var [format, setFormat] = useState(formats[0]);
  var today = new Date().toDateString();

  return (
    <div className="datepicker row">
      <div className="col-xlg-6 col-md-12 col-sm-6">
        <h4>Inline</h4>
        <label>Selected date is: <em>{today}</em></label>
        <InlineDatepicker />
      </div>
      <div className="col-xlg-6 col-md-12 col-sm-6">
        <h4>Popup</h4>
        <label>Selected date is: <em>{today}</em></label>
        <p className="input-group">
          <input
            type="text"
            className="form-control"
            uib-datepicker-popup={format}
            ng-model="dt"
            is-open="opened"
            close-text="Close"
            show-button-bar="false"
            defaultValue=""
          />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-calendar"></i></button>
          </span>
        </p>
        <label>Format: <span className="muted-text">(manual alternate <em>{formats[0]}</em>)</span></label>
        <select
          className="form-control"
          ng-model="format"
          value={format}
          onChange={function (e) { setFormat(e.target.value); }}
        >
          <option value=""></option>
          {formats.map(function (f) { return <option key={f} value={f}>{f}</option>; })}
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

function UiSelect({ placeholder, multiple, withClear, searchEnabled }) {
  var containerClass = 'ui-select-container ui-select-bootstrap dropdown btn-group bootstrap-select form-control';
  if (multiple) {
    containerClass += ' ui-select-multiple';
  }
  var select = (
    <div className={containerClass} ng-model="selected">
      <div className="ui-select-match">
        <span className="ui-select-placeholder text-muted">{placeholder}</span>
      </div>
      {searchEnabled ? (
        <input type="text" className="ui-select-search form-control" placeholder={placeholder} autoComplete="off" />
      ) : null}
    </div>
  );

  if (withClear) {
    return (
      <div className="form-group">
        <div className="input-group">
          {select}
          <span className="input-group-btn">
            <button type="button" className="btn btn-danger">
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </span>
        </div>
      </div>
    );
  }
  return <div className="form-group">{select}</div>;
}

function Selects() {
  return (
    <div className="ng-cloak">
      <UiSelect placeholder="Standard Select" />
      <UiSelect placeholder="Select With Search" searchEnabled />
      <UiSelect placeholder="Disabled Selection" />
      <UiSelect placeholder="Select With Option Groups" searchEnabled />
      <UiSelect placeholder="Select With Option Groups Function" searchEnabled />
      <UiSelect placeholder="Multiple Select" multiple searchEnabled />
      <UiSelect placeholder="Select With Clear Button" multiple withClear searchEnabled />
    </div>
  );
}

function OldSelects() {
  var standardItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <div>
      <div className="form-group">
        <select className="form-control selectpicker" selectpicker="" title="Standard Select" defaultValue="">
          <option value="" data-hidden="true">Standard Select</option>
          {standardItems.map(function (o) { return <option key={o}>{o}</option>; })}
        </select>
      </div>
      <div className="form-group">
        <select className="form-control selectpicker with-search" data-live-search="true" title="Select With Search" selectpicker="" defaultValue="">
          <option value="" data-hidden="true">Select With Search</option>
          <option>Hot Dog, Fries and a Soda</option>
          <option>Burger, Shake and a Smile</option>
          <option>Sugar, Spice and all things nice</option>
          <option>Baby Back Ribs</option>
        </select>
      </div>
      <div className="form-group">
        <select className="form-control selectpicker" title="Option Types" selectpicker="" defaultValue="">
          <option value="" data-hidden="true">Option Types</option>
          <option>Standard option</option>
          <option data-subtext="option subtext">Option with subtext</option>
          <option disabled>Disabled Option</option>
          <option data-icon="glyphicon-heart">Option with cion</option>
        </select>
      </div>
      <div className="form-group">
        <select className="form-control selectpicker" disabled title="Disabled Select" selectpicker="" defaultValue="">
          <option value="" data-hidden="true">Disabled Select</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>
  );
}

export function FormInputsPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <PanelBox title="Standard Fields"><StandardFields /></PanelBox>
          <PanelBox title="Tags Input"><TagsInput /></PanelBox>
          <PanelBox title="Input Groups"><InputGroups /></PanelBox>
          <PanelBox title="Checkboxes & Radios"><CheckboxesRadios /></PanelBox>
          <PanelBox title="On/Off Switches"><Switches /></PanelBox>
          <PanelBox title="Old On/Off Switches (Deprecated)"><OldSwitches /></PanelBox>
          <PanelBox title="Datepicker"><Datepickers /></PanelBox>
        </div>
        <div className="col-md-6">
          <PanelBox title="Validation States"><ValidationStates /></PanelBox>
          <PanelBox title="Selects"><Selects /></PanelBox>
          <PanelBox title="Old selects(deprecated)"><OldSelects /></PanelBox>
        </div>
      </div>
    </div>
  );
}
