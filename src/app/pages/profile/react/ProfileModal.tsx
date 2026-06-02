import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: string) => void;
}

function ProfileModal({ isOpen, onClose, onSave }: ProfileModalProps) {
  var [link, setLink] = useState('');

  useEffect(function () {
    if (isOpen) {
      setLink('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div className="modal-backdrop fade in"></div>
      <div className="modal fade in" style={{ display: 'block' }} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={onClose} aria-label="Close">
                <em className="ion-ios-close-empty sn-link-close"></em>
              </button>
              <h4 className="modal-title" id="myModalLabel">Add Account</h4>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={function () {
                    onSave(link);
                    setLink('');
                  }}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProfileModal;
