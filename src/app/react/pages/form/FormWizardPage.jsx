/**
 * Form Wizard page — React migration of src/app/pages/form/wizard.
 *
 * Reimplements the ba-wizard / ba-wizard-step directives: a tabbed,
 * multi-step form where advancing to the next step requires the current
 * step's form to be valid (HTML5 validity), mirroring the original
 * `isAvailiable()` / `isComplete()` gating in baWizardCtrl.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Panel } from '../../components/Panel';

var STEP_TITLES = ['Personal info', 'Product Info', 'Shipment', 'Finish'];

export function FormWizardPage() {
  var [tabNum, setTabNum] = useState(0);

  var containerRef = useRef(null);
  var formRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  var lastTab = STEP_TITLES.length - 1;
  var progress = ((tabNum + 1) / STEP_TITLES.length) * 100;

  function goTo(target) {
    if (target < 0 || target > lastTab) {
      return;
    }
    var prevIdx = target - 1;
    var available = true;
    if (prevIdx >= 0) {
      var form = formRefs[prevIdx].current;
      available = form ? form.checkValidity() : true;
    }
    if (available) {
      setTabNum(target);
    }
  }

  function selectTab(target) {
    // Mirror selectTab: a step is reachable only if every preceding step's
    // form is valid, otherwise stay where we are.
    if (target === tabNum) {
      return;
    }
    for (var i = 0; i < target; i++) {
      var f = formRefs[i].current;
      if (f && !f.checkValidity()) {
        return;
      }
    }
    setTabNum(target);
  }

  function stepStyle(index) {
    return { display: index === tabNum ? '' : 'none' };
  }

  return (
    <div className="widgets" ref={containerRef}>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Form Wizard" panelClass="with-scroll">
            <div className="ba-wizard">
              <div className="ba-wizard-navigation-container">
                {STEP_TITLES.map(function (title, index) {
                  return (
                    <div
                      key={index}
                      className={'ba-wizard-navigation ' + (tabNum === index ? 'active' : '')}
                      onClick={function () { selectTab(index); }}
                    >
                      {title}
                    </div>
                  );
                })}
              </div>

              <div className="progress ba-wizard-progress">
                <div
                  className="progress-bar progress-bar-danger active"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progress + '%' }}
                ></div>
              </div>

              <div className="steps">
                <section className="step" style={stepStyle(0)}>
                  <form ref={formRefs[0]} noValidate>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label htmlFor="exampleUsername1">Username</label>
                          <input type="text" className="form-control" id="exampleUsername1" name="username" placeholder="Username" required />
                          <span className="help-block error-block basic-block">Required</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="Email" required />
                          <span className="help-block error-block basic-block">Proper email required</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" required />
                          <span className="help-block error-block basic-block">Required</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                          <input type="password" className="form-control" id="exampleInputConfirmPassword1" name="confirmPassword" placeholder="Confirm Password" required />
                          <span className="help-block error-block basic-block">Passwords should match</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>

                <section className="step" style={stepStyle(1)}>
                  <form ref={formRefs[1]} noValidate>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label htmlFor="productName">Product name</label>
                          <input type="text" className="form-control" id="productName" name="productName" placeholder="Product name" required />
                          <span className="help-block error-block basic-block">Required</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="productId">Product id</label>
                          <input type="text" className="form-control" id="productId" name="productId" placeholder="productId" required />
                          <span className="help-block error-block basic-block">Required</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productName">Category</label>
                          <select className="form-control selectpicker" title="Category" defaultValue="Electronics">
                            <option>Electronics</option>
                            <option>Toys</option>
                            <option>Accessories</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>

                <section className="step" style={stepStyle(2)}>
                  <form ref={formRefs[2]} noValidate>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group has-feedback">
                          <label htmlFor="address">Shipment address</label>
                          <input type="text" className="form-control" id="address" name="address" placeholder="Shipment address" required />
                          <span className="help-block error-block basic-block">Required</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="shipmentMethod">Shipment method</label>
                          <select className="form-control selectpicker" title="Category" defaultValue="Fast & expensive">
                            <option>Fast &amp; expensive</option>
                            <option>Cheap &amp; free</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="checkbox">
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span>Save shipment info</span>
                      </label>
                    </div>
                  </form>
                </section>

                <section className="step" style={stepStyle(3)}>
                  <form className="form-horizontal" ref={formRefs[3]} noValidate>
                    Congratulations! You have successfully filled the form!
                  </form>
                </section>
              </div>

              <nav>
                <ul className="pager ba-wizard-pager">
                  <li className="previous">
                    <button disabled={tabNum === 0} onClick={function () { goTo(tabNum - 1); }} type="button" className=" btn btn-primary">
                      <span aria-hidden="true">&larr;</span> previous
                    </button>
                  </li>
                  <li className="next">
                    <button disabled={tabNum === lastTab} onClick={function () { goTo(tabNum + 1); }} type="button" className="btn btn-primary">
                      next <span aria-hidden="true">&rarr;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
