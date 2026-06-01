import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

function ComposeModal({ isOpen, onClose, subject: initialSubject, to: initialTo, text: initialText }) {
  var [to, setTo] = useState(initialTo || '');
  var [subject, setSubject] = useState(initialSubject || '');
  var [text, setText] = useState(initialText || '');

  useEffect(function () {
    if (isOpen) {
      setTo(initialTo || '');
      setSubject(initialSubject || '');
      setText(initialText || '');
    }
  }, [isOpen, initialTo, initialSubject, initialText]);

  function handleSend() {
    onClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-dialog modal-compose"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="compose-header">
        <span>New message</span>
        <span className="header-controls">
          <i className="ion-minus-round"></i>
          <i className="ion-arrow-resize"></i>
          <i className="ion-close-round" onClick={onClose}></i>
        </span>
      </div>
      <div>
        <input
          type="text"
          className="form-control compose-input default-color"
          placeholder="To"
          value={to}
          onChange={function (e) { setTo(e.target.value); }}
        />
        <input
          type="text"
          className="form-control compose-input default-color"
          placeholder="Subject"
          value={subject}
          onChange={function (e) { setSubject(e.target.value); }}
        />
        <div className="compose-container">
          <textarea
            className="form-control"
            rows="10"
            value={text}
            onChange={function (e) { setText(e.target.value); }}
          ></textarea>
        </div>
      </div>
      <div className="compose-footer clearfix">
        <button type="button" className="btn btn-send" onClick={handleSend}>Send</button>
        <div className="footer-controls">
          <i className="footer-control-first compose-footer-icon ion-arrow-down-b"></i>
          <i className="compose-footer-icon ion-android-delete" onClick={onClose}></i>
        </div>
      </div>
    </ReactModal>
  );
}

export default ComposeModal;
