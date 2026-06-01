import React, { useState, useRef } from 'react';
import Panel from './Panel';
import Switch from './Switch';
import ProfileModal from './ProfileModal';

var PROFILE_IMAGE_PATH = 'assets/img/app/profile/';
var NO_PHOTO_PATH = 'assets/img/theme/no-photo.png';

var INITIAL_SOCIAL_PROFILES = [
  { name: 'Facebook', href: 'https://www.facebook.com/akveo/', icon: 'socicon-facebook' },
  { name: 'Twitter', href: 'https://twitter.com/akveo_inc', icon: 'socicon-twitter' },
  { name: 'Google', href: undefined, icon: 'socicon-google' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/akveo', icon: 'socicon-linkedin' },
  { name: 'GitHub', href: 'https://github.com/akveo', icon: 'socicon-github' },
  { name: 'StackOverflow', href: undefined, icon: 'socicon-stackoverflow' },
  { name: 'Dribbble', href: undefined, icon: 'socicon-dribble' },
  { name: 'Behance', href: undefined, icon: 'socicon-behace' }
];

var INITIAL_SWITCHES = [true, true, false, true, true, false];

var SWITCH_LABELS = [
  'When I receive a message',
  'When Someone sends me an invitation',
  'When profile information changes',
  'When anyone logs into your account from a new device or browser',
  'Weekly Reports',
  'Daily Reports'
];

function ProfilePage() {
  var pictureState = useState(PROFILE_IMAGE_PATH + 'Nasta.png');
  var picture = pictureState[0];
  var setPicture = pictureState[1];

  var noPictureState = useState(false);
  var noPicture = noPictureState[0];
  var setNoPicture = noPictureState[1];

  var socialState = useState(INITIAL_SOCIAL_PROFILES);
  var socialProfiles = socialState[0];
  var setSocialProfiles = socialState[1];

  var switchesState = useState(INITIAL_SWITCHES);
  var switches = switchesState[0];
  var setSwitches = switchesState[1];

  var modalOpenState = useState(false);
  var modalOpen = modalOpenState[0];
  var setModalOpen = modalOpenState[1];

  var modalItemState = useState(null);
  var modalItem = modalItemState[0];
  var setModalItem = modalItemState[1];

  var fileInputRef = useRef(null);

  function removePicture() {
    setPicture(NO_PHOTO_PATH);
    setNoPicture(true);
  }

  function uploadPicture() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function getFile(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (evt) {
      setPicture(evt.target.result);
      setNoPicture(false);
    };
    reader.readAsDataURL(file);
  }

  function unconnect(index) {
    var updated = socialProfiles.map(function (item, i) {
      if (i === index) {
        return Object.assign({}, item, { href: undefined });
      }
      return item;
    });
    setSocialProfiles(updated);
  }

  function showModal(index) {
    setModalItem(index);
    setModalOpen(true);
  }

  function handleModalSubmit(link) {
    if (modalItem !== null) {
      var updated = socialProfiles.map(function (item, i) {
        if (i === modalItem) {
          return Object.assign({}, item, { href: link });
        }
        return item;
      });
      setSocialProfiles(updated);
    }
    setModalOpen(false);
    setModalItem(null);
  }

  function handleModalClose() {
    setModalOpen(false);
    setModalItem(null);
  }

  function handleSwitchChange(index, value) {
    var updated = switches.map(function (s, i) {
      return i === index ? value : s;
    });
    setSwitches(updated);
  }

  return (
    <Panel panelClass="profile-page">
      <div className="panel-content">
        <div className="progress-info">Your profile is 70% Complete</div>
        <div className="progress">
          <div
            className="progress-bar progress-bar-primary progress-bar-striped active"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '70%' }}
          ></div>
        </div>

        <h3 className="with-line">General Information</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label className="col-sm-3 control-label">Picture</label>
              <div className="col-sm-9">
                <div className="userpic">
                  <div className="userpic-wrapper">
                    <img src={picture} onClick={uploadPicture} />
                  </div>
                  {!noPicture && (
                    <i className="ion-ios-close-outline" onClick={removePicture}></i>
                  )}
                  <a href="#" className="change-userpic" onClick={function (e) { e.preventDefault(); uploadPicture(); }}>
                    Change Profile Picture
                  </a>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={getFile}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputFirstName" className="col-sm-3 control-label">First Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputFirstName" defaultValue="Anastasiya" />
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputLastName" className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputLastName" defaultValue="" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label className="col-sm-3 control-label">Department</label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Web Development</option>
                  <option>System Development</option>
                  <option>Sales</option>
                  <option>Human Resources</option>
                </select>
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputOccupation" className="col-sm-3 control-label">Occupation</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputOccupation" defaultValue="Front End Web Developer" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="with-line">Change Password</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputPassword" className="col-sm-3 control-label">Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputPassword" defaultValue="12345678" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputConfirmPassword" className="col-sm-3 control-label">Confirm Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputConfirmPassword" defaultValue="" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="with-line">Contact Information</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputEmail3" className="col-sm-3 control-label">Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="inputEmail3" defaultValue="contact@akveo.com" />
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputPhone" className="col-sm-3 control-label">Phone</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputPhone" defaultValue="+1 (23) 456 7890" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label className="col-sm-3 control-label">Office Location</label>
              <div className="col-sm-9">
                <select className="form-control" title="Standard Select">
                  <option>San Francisco</option>
                  <option>London</option>
                  <option>Minsk</option>
                  <option>Tokio</option>
                </select>
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputRoom" className="col-sm-3 control-label">Room</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputRoom" defaultValue="303" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="with-line">Social Profiles</h3>

        <div className="social-profiles row clearfix">
          {socialProfiles.map(function (item, index) {
            if (!item.href) {
              return (
                <div className="col-md-3 col-sm-4" key={item.name}>
                  <a className="sn-link" href="#" onClick={function (e) { e.preventDefault(); showModal(index); }}>
                    <i className={'socicon ' + item.icon}></i>
                    <span>{item.name}</span>
                  </a>
                </div>
              );
            }
            return (
              <div className="col-md-3 col-sm-4" key={item.name}>
                <a className="sn-link connected" href={item.href} target="_blank" rel="noopener noreferrer">
                  <i className={'socicon ' + item.icon}></i>
                  <span>{item.name}</span>
                  <em
                    className="ion-ios-close-empty sn-link-close"
                    onMouseDown={function () { unconnect(index); }}
                  ></em>
                </a>
              </div>
            );
          })}
        </div>

        <h3 className="with-line">Send Email Notifications</h3>

        <div className="notification row clearfix">
          <div className="col-sm-6">
            {SWITCH_LABELS.slice(0, 3).map(function (label, i) {
              return (
                <div className="form-group row clearfix" key={i}>
                  <label className="col-xs-8">{label}</label>
                  <div className="col-xs-4">
                    <Switch
                      checked={switches[i]}
                      onChange={function (val) { handleSwitchChange(i, val); }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-sm-6">
            {SWITCH_LABELS.slice(3).map(function (label, i) {
              var idx = i + 3;
              return (
                <div className="form-group row clearfix" key={idx}>
                  <label className="col-xs-8">{label}</label>
                  <div className="col-xs-4">
                    <Switch
                      checked={switches[idx]}
                      onChange={function (val) { handleSwitchChange(idx, val); }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className="btn btn-primary btn-with-icon save-profile">
          <i className="ion-android-checkmark-circle"></i>Update Profile
        </button>
      </div>

      <ProfileModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </Panel>
  );
}

export default ProfilePage;
