/**
 * ModalsPage — React migration of src/app/pages/ui/modals.
 *
 * The original opens dialogs via $uibModal. Here a single child <Modal>
 * component is rendered conditionally based on the parent's `modal` state,
 * reproducing the Bootstrap `.modal-dialog` / `.modal-content` structure.
 */
import React, { useState, useCallback } from 'react';
import { Panel } from '../components/Panel';

var LOREM = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.';

var SIZE_CLASS = { lg: 'modal-lg', sm: 'modal-sm', md: '' };

var MESSAGE_MODALS = {
  success: { headerClass: 'bg-success', icon: 'ion-checkmark', title: 'Success', body: 'Your information has been saved successfully', btn: 'btn-success' },
  info: { headerClass: 'bg-info', icon: 'ion-information', title: 'Info', body: "You've got a new message", btn: 'btn-info' },
  warning: { headerClass: 'bg-warning', icon: 'ion-alert', title: 'Warning', body: 'Better check yourself', btn: 'btn-warning' },
  danger: { headerClass: 'bg-danger', icon: 'ion-close', title: 'Error', body: 'Your information has not been saved', btn: 'btn-danger' }
};

function Modal({ modal, onClose }) {
  if (!modal) { return null; }

  var dialogClass = 'modal-dialog ' + (SIZE_CLASS[modal.size] || '');
  var content;

  if (modal.type === 'progress') {
    content = (
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Loading ...</h4>
        </div>
        <div className="modal-body">
          <div className="progress">
            <div className="progress-bar progress-bar-info progress-bar-striped active" role="progressbar"
              aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
              <span className="sr-only">Loading</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (MESSAGE_MODALS[modal.type]) {
    var m = MESSAGE_MODALS[modal.type];
    content = (
      <div className="modal-content">
        <div className={'modal-header ' + m.headerClass}>
          <i className={m.icon + ' modal-icon'}></i><span> {m.title}</span>
        </div>
        <div className="modal-body text-center">{m.body}</div>
        <div className="modal-footer">
          <button type="button" className={'btn ' + m.btn} onClick={onClose}>OK</button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            <em className="ion-ios-close-empty sn-link-close"></em>
          </button>
          <h4 className="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div className="modal-body">{LOREM}</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>Save changes</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="modal fade in" role="dialog" tabIndex="-1" style={{ display: 'block' }}>
        <div className={dialogClass.trim()}>{content}</div>
      </div>
      <div className="modal-backdrop fade in" onClick={onClose}></div>
    </div>
  );
}

export function ModalsPage() {
  var [modal, setModal] = useState(null);

  var open = useCallback(function (type, size) {
    setModal({ type: type, size: size });
  }, []);

  var close = useCallback(function () {
    setModal(null);
  }, []);

  return (
    <div className="widgets">
      <div className="row">
        <Panel outerClass="col-md-12" title="Modals" panelClass="with-scroll">
          <div className="modal-buttons clearfix">
            <button type="button" className="btn btn-primary" onClick={function () { open('basic', 'md'); }}>Default modal</button>
            <button type="button" className="btn btn-success" onClick={function () { open('large', 'lg'); }}>Large modal</button>
            <button type="button" className="btn btn-warning" onClick={function () { open('small', 'sm'); }}>Small modal</button>
          </div>
        </Panel>
      </div>

      <div className="row">
        <Panel outerClass="col-md-6" title="Message Modals" panelClass="with-scroll">
          <div className="modal-buttons same-width clearfix">
            <button type="button" className="btn btn-success" onClick={function () { open('success'); }}>Success Message</button>
            <button type="button" className="btn btn-info" onClick={function () { open('info'); }}>Info Message</button>
            <button type="button" className="btn btn-warning" onClick={function () { open('warning'); }}>Warning Message</button>
            <button type="button" className="btn btn-danger" onClick={function () { open('danger'); }}>Danger Message</button>
          </div>
        </Panel>
        <Panel outerClass="col-md-6" title="Notifications" panelClass="with-scroll">
          <div className="modal-buttons same-width clearfix">
            <button type="button" className="btn btn-success">Success</button>
            <button type="button" className="btn btn-info">Info</button>
            <button type="button" className="btn btn-danger">Error</button>
            <button type="button" className="btn btn-warning">Warning</button>
          </div>
        </Panel>
      </div>

      <div className="row">
        <Panel outerClass="col-md-6" title="Progress dialogs" panelClass="with-scroll">
          <div className="modal-buttons same-width clearfix">
            <button type="button" className="btn btn-info" onClick={function () { open('progress'); }}>Progress dialog</button>
          </div>
        </Panel>
      </div>

      <Modal modal={modal} onClose={close} />
    </div>
  );
}
