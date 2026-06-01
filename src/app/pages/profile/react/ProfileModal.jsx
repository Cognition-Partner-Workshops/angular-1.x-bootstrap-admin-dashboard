import React, { useState } from 'react';
import Modal from 'react-modal';

var modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1050
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: '4px',
    maxWidth: '500px',
    width: '90%'
  }
};

function ProfileModal({ isOpen, onClose, onSubmit }) {
  var linkState = useState('');
  var link = linkState[0];
  var setLink = linkState[1];

  function handleSubmit() {
    onSubmit(link);
    setLink('');
  }

  function handleClose() {
    setLink('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={handleClose} aria-label="Close">
            <em className="ion-ios-close-empty sn-link-close"></em>
          </button>
          <h4 className="modal-title">Add Account</h4>
        </div>
        <form name="linkForm">
          <div className="modal-body">
            <p>Paste a link to your profile into the box below</p>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Link to Profile"
                value={link}
                onChange={function (e) { setLink(e.target.value); }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProfileModal;
