import React, { useState, useEffect, useCallback } from 'react';
import Panel from './Panel';

function Modal({ isOpen, onClose, size, children, title }) {
  if (!isOpen) return null;

  var sizeClass = size === 'lg' ? 'modal-lg' : size === 'sm' ? 'modal-sm' : '';

  return (
    <div className="modal in" style={{ display: 'block' }} role="dialog">
      <div className="modal-backdrop in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1040 }} onClick={onClose}></div>
      <div className={'modal-dialog ' + sizeClass} style={{ position: 'relative', zIndex: 1050 }}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

function BasicModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="modal-header">
        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Modal title</h4>
      </div>
      <div className="modal-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis facilisis. Aenean ac turpis id quam fringilla blandit ac vel tortor. Curabitur vel velit non lacus tristique aliquet. Donec sed molestie turpis, eu elementum libero. Vivamus consectetur urna in magna maximus ultricies.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </Modal>
  );
}

function LargeModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="modal-header">
        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Large modal</h4>
      </div>
      <div className="modal-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis facilisis. Aenean ac turpis id quam fringilla blandit ac vel tortor.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </Modal>
  );
}

function SmallModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="modal-header">
        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Small modal</h4>
      </div>
      <div className="modal-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </Modal>
  );
}

function MessageModal({ isOpen, onClose, type, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={'modal-header bg-' + type}>
        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">{title}</h4>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}

function ProgressModal({ isOpen, onClose }) {
  var [progress, setProgress] = useState(0);

  useEffect(function () {
    if (!isOpen) { setProgress(0); return; }
    var timer = setInterval(function () {
      setProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev + 10;
      });
    }, 300);
    return function () { clearInterval(timer); };
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="modal-header">
        <h4 className="modal-title">Progress</h4>
      </div>
      <div className="modal-body">
        <div className="progress">
          <div className="progress-bar progress-bar-primary" role="progressbar" style={{ width: progress + '%' }}>
            {progress}%
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Modals() {
  var [activeModal, setActiveModal] = useState(null);

  var close = useCallback(function () { setActiveModal(null); }, []);

  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <Panel title="Modals" panelClass="with-scroll">
            <div className="modal-buttons clearfix">
              <button type="button" className="btn btn-primary" onClick={function () { setActiveModal('basic'); }}>Default modal</button>
              <button type="button" className="btn btn-success" onClick={function () { setActiveModal('large'); }}>Large modal</button>
              <button type="button" className="btn btn-warning" onClick={function () { setActiveModal('small'); }}>Small modal</button>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Message Modals" panelClass="with-scroll">
            <div className="modal-buttons same-width clearfix">
              <button type="button" className="btn btn-success" onClick={function () { setActiveModal('success'); }}>Success Message</button>
              <button type="button" className="btn btn-info" onClick={function () { setActiveModal('info'); }}>Info Message</button>
              <button type="button" className="btn btn-warning" onClick={function () { setActiveModal('warning'); }}>Warning Message</button>
              <button type="button" className="btn btn-danger" onClick={function () { setActiveModal('danger'); }}>Danger Message</button>
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Notifications" panelClass="with-scroll">
            <div className="modal-buttons same-width clearfix">
              <button type="button" className="btn btn-success" onClick={function () { alert('Your information has been saved successfully!'); }}>Success Notification</button>
              <button type="button" className="btn btn-info" onClick={function () { alert("You've got a new email!"); }}>Info Notification</button>
              <button type="button" className="btn btn-warning" onClick={function () { alert('Your computer is about to explode!'); }}>Warning Notification</button>
              <button type="button" className="btn btn-danger" onClick={function () { alert("Your information hasn't been saved!"); }}>Danger Notification</button>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Progress dialogs" panelClass="with-scroll">
            <div className="modal-buttons same-width clearfix">
              <button type="button" className="btn btn-info" onClick={function () { setActiveModal('progress'); }}>Progress dialog</button>
            </div>
          </Panel>
        </div>
      </div>

      <BasicModal isOpen={activeModal === 'basic'} onClose={close} />
      <LargeModal isOpen={activeModal === 'large'} onClose={close} />
      <SmallModal isOpen={activeModal === 'small'} onClose={close} />
      <MessageModal isOpen={activeModal === 'success'} onClose={close} type="success" title="Well done!" message="You successfully read this important alert message." />
      <MessageModal isOpen={activeModal === 'info'} onClose={close} type="info" title="Heads up!" message="This alert needs your attention, but it's not super important." />
      <MessageModal isOpen={activeModal === 'warning'} onClose={close} type="warning" title="Warning!" message="Better check yourself, you're not looking too good." />
      <MessageModal isOpen={activeModal === 'danger'} onClose={close} type="danger" title="Oh snap!" message="Change a few things up and try submitting again." />
      <ProgressModal isOpen={activeModal === 'progress'} onClose={close} />
    </div>
  );
}

export default Modals;
