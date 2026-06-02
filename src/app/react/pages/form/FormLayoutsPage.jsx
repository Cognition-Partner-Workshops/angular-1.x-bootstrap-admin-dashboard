/**
 * Form Layouts page — React migration of src/app/pages/form/layouts.
 */
import React from 'react';
import { Panel } from '../../components/Panel';

function InlineForm() {
  return (
    <form className="row form-inline">
      <div className="form-group col-sm-3 col-xs-6">
        <input type="text" className="form-control" id="exampleInputName2" placeholder="Name" />
      </div>
      <div className="form-group col-sm-3 col-xs-6">
        <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email" />
      </div>
      <div className="checkbox">
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Send invitation</button>
    </form>
  );
}

function BasicForm() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <div className="checkbox">
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span>Check me out</span>
        </label>
      </div>
      <button type="submit" className="btn btn-danger">Submit</button>
    </form>
  );
}

function HorizontalForm() {
  return (
    <form className="form-horizontal">
      <div className="form-group">
        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <div className="checkbox">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-warning">Sign in</button>
        </div>
      </div>
    </form>
  );
}

function FormWithoutLabels() {
  return (
    <form>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Recipients" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Subject" />
      </div>
      <div className="form-group">
        <textarea className="form-control" placeholder="Message"></textarea>
      </div>
      <button type="submit" className="btn btn-success">Send</button>
    </form>
  );
}

function BlockForm() {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="inputWebsite">Website</label>
            <input type="text" className="form-control" id="inputWebsite" placeholder="Website" />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );
}

export function FormLayoutsPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <Panel title="Inline Form" panelClass="with-scroll"><InlineForm /></Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Panel title="Basic Form" panelClass="with-scroll"><BasicForm /></Panel>
          <Panel title="Horizontal Form" panelClass="with-scroll"><HorizontalForm /></Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Form Without Labels" panelClass="with-scroll"><FormWithoutLabels /></Panel>
          <Panel title="Block Form" panelClass="with-scroll"><BlockForm /></Panel>
        </div>
      </div>
    </div>
  );
}
