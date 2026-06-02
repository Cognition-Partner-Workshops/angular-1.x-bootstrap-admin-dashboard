/**
 * FormWizardPage — React migration of src/app/pages/form/wizard/.
 *
 * Replicates the baWizard / baWizardStep directives: tab navigation, progress
 * bar, and "next" gating on the current step's required fields being valid
 * (mirrors baWizardCtrl.selectTab -> isAvailiable -> prevTab.isComplete).
 */
import React, { useState } from 'react';
import { PanelBox } from './PanelBox';

var STEP_TITLES = ['Personal info', 'Product Info', 'Shipment', 'Finish'];

export function FormWizardPage() {
  var [tab, setTab] = useState(0);

  var [username, setUsername] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [productName, setProductName] = useState('');
  var [productId, setProductId] = useState('');
  var [address, setAddress] = useState('');

  function isStepValid(stepIndex) {
    switch (stepIndex) {
      case 0:
        return !!(username && email && password && confirmPassword);
      case 1:
        return !!(productName && productId);
      case 2:
        return !!address;
      default:
        return true;
    }
  }

  function selectTab(target) {
    if (target === tab) {
      return;
    }
    if (target === 0 || isStepValid(target - 1)) {
      setTab(target);
    }
  }

  function nextTab() {
    if (isStepValid(tab)) {
      setTab(Math.min(tab + 1, STEP_TITLES.length - 1));
    }
  }

  function previousTab() {
    setTab(Math.max(tab - 1, 0));
  }

  var progress = ((tab + 1) / STEP_TITLES.length) * 100;
  var stepStyle = function (i) { return { display: tab === i ? 'block' : 'none' }; };

  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <PanelBox title="Form Wizard">
            <ba-wizard>
              <div className="ba-wizard">
                <div className="ba-wizard-navigation-container">
                  {STEP_TITLES.map(function (title, i) {
                    return (
                      <div
                        key={title}
                        className={'ba-wizard-navigation ' + (tab === i ? 'active' : '')}
                        onClick={function () { selectTab(i); }}
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
                    <form name="personalInfoForm" noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group has-feedback">
                            <label htmlFor="exampleUsername1">Username</label>
                            <input type="text" className="form-control" id="exampleUsername1" name="username" placeholder="Username" value={username} onChange={function (e) { setUsername(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Required</span>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Proper email required</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Required</span>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputConfirmPassword1" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={function (e) { setConfirmPassword(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Passwords should match</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </section>

                  <section className="step" style={stepStyle(1)}>
                    <form name="productInfoForm" noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group has-feedback">
                            <label htmlFor="productName">Product name</label>
                            <input type="text" className="form-control" id="productName" name="productName" placeholder="Product name" value={productName} onChange={function (e) { setProductName(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Required</span>
                          </div>
                          <div className="form-group">
                            <label htmlFor="productId">Product id</label>
                            <input type="text" className="form-control" id="productId" name="productId" placeholder="productId" value={productId} onChange={function (e) { setProductId(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Required</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="productName">Category</label>
                            <select className="form-control" title="Category" selectpicker="" defaultValue="Electronics">
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
                    <form name="addressForm" noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group has-feedback">
                            <label htmlFor="address">Shipment address</label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Shipment address" value={address} onChange={function (e) { setAddress(e.target.value); }} required />
                            <span className="help-block error-block basic-block">Required</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="shipmentMethod">Shipment method</label>
                            <select className="form-control" title="Category" selectpicker="" defaultValue="Fast & expensive">
                              <option>Fast & expensive</option>
                              <option>Cheap & free</option>
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
                    <form className="form-horizontal" name="finishForm" noValidate>
                      Congratulations! You have successfully filled the form!
                    </form>
                  </section>
                </div>

                <nav>
                  <ul className="pager ba-wizard-pager">
                    <li className="previous">
                      <button disabled={tab === 0} onClick={previousTab} type="button" className=" btn btn-primary">
                        <span aria-hidden="true">&larr;</span> previous
                      </button>
                    </li>
                    <li className="next">
                      <button disabled={tab === STEP_TITLES.length - 1} onClick={nextTab} type="button" className="btn btn-primary">
                        next <span aria-hidden="true">&rarr;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </ba-wizard>
          </PanelBox>
        </div>
      </div>
    </div>
  );
}
