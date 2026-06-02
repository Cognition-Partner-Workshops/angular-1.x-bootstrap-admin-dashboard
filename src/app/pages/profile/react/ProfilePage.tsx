import React, { useState, useRef, useEffect } from 'react';
import Panel from './Panel';
import ProfileModal from './ProfileModal';
import SwitchToggle from './SwitchToggle';

var IMAGES_ROOT = 'assets/img/';

function profilePicture(name: string, ext: string = 'png') {
  return IMAGES_ROOT + 'app/profile/' + name + '.' + ext;
}

function appImage(path: string) {
  return IMAGES_ROOT + path;
}

interface SocialProfile {
  name: string;
  href?: string;
  icon: string;
}

function ProfilePage() {
  var [picture, setPicture] = useState(profilePicture('Nasta'));
  var [noPicture, setNoPicture] = useState(false);
  var [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>([
    { name: 'Facebook', href: 'https://www.facebook.com/akveo/', icon: 'socicon-facebook' },
    { name: 'Twitter', href: 'https://twitter.com/akveo_inc', icon: 'socicon-twitter' },
    { name: 'Google', icon: 'socicon-google' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/akveo', icon: 'socicon-linkedin' },
    { name: 'GitHub', href: 'https://github.com/akveo', icon: 'socicon-github' },
    { name: 'StackOverflow', icon: 'socicon-stackoverflow' },
    { name: 'Dribbble', icon: 'socicon-dribble' },
    { name: 'Behance', icon: 'socicon-behace' },
  ]);
  var [switches, setSwitches] = useState([true, true, false, true, true, false]);
  var [modalOpen, setModalOpen] = useState(false);
  var [modalTarget, setModalTarget] = useState<number | null>(null);

  var fileInputRef = useRef<HTMLInputElement>(null);

  function removePicture() {
    setPicture(appImage('theme/no-photo.png'));
    setNoPicture(true);
  }

  function uploadPicture() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    var file = e.target.files && e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        setPicture(reader.result as string);
        setNoPicture(false);
      };
      reader.readAsDataURL(file);
    }
  }

  function unconnect(index: number) {
    setSocialProfiles(function (prev) {
      var updated = prev.map(function (item, i) {
        if (i === index) {
          return { name: item.name, icon: item.icon };
        }
        return item;
      });
      return updated;
    });
  }

  function showModal(index: number) {
    setModalTarget(index);
    setModalOpen(true);
  }

  function handleModalSave(link: string) {
    if (modalTarget !== null) {
      setSocialProfiles(function (prev) {
        var updated = prev.map(function (item, i) {
          if (i === modalTarget) {
            return { name: item.name, href: link, icon: item.icon };
          }
          return item;
        });
        return updated;
      });
    }
    setModalOpen(false);
    setModalTarget(null);
  }

  function toggleSwitch(index: number) {
    setSwitches(function (prev) {
      var updated = prev.slice();
      updated[index] = !updated[index];
      return updated;
    });
  }

  var switchLabels = [
    'When I receive a message',
    'When Someone sends me an invitation',
    'When profile information changes',
    'When anyone logs into your account from a new device or browser',
    'Weekly Reports',
    'Daily Reports',
  ];

  return (
    <Panel panelClass="profile-page">
      <div className="panel-content">
        <div className="progress-info">Your profile is 70% Complete</div>
        <div className="progress">
          <div
            className="progress-bar progress-bar-primary progress-bar-striped active"
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: '70%' }}
          ></div>
        </div>

        <h3 className="with-line">General Information</h3>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputFirstName" className="col-sm-3 control-label">Picture</label>
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
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id="uploadFile"
                    onChange={handleFileChange}
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
                <input type="text" className="form-control" id="inputFirstName" placeholder="" defaultValue="Anastasiya" />
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputLastName" className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputLastName" placeholder="" defaultValue="" />
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
                <input type="text" className="form-control" id="inputOccupation" placeholder="" defaultValue="Front End Web Developer" />
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
                <input type="password" className="form-control" id="inputPassword" placeholder="" defaultValue="12345678" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row clearfix">
              <label htmlFor="inputConfirmPassword" className="col-sm-3 control-label">Confirm Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputConfirmPassword" placeholder="" />
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
                <input type="email" className="form-control" id="inputEmail3" placeholder="" defaultValue="contact@akveo.com" />
              </div>
            </div>
            <div className="form-group row clearfix">
              <label htmlFor="inputPhone" className="col-sm-3 control-label">Phone</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputPhone" placeholder="" defaultValue="+1 (23) 456 7890" />
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
                <input type="text" className="form-control" id="inputRoom" placeholder="" defaultValue="303" />
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
                <a className="sn-link connected" href={item.href} target="_blank">
                  <i className={'socicon ' + item.icon}></i>
                  <span>{item.name}</span>
                  <em
                    className="ion-ios-close-empty sn-link-close"
                    onMouseDown={function (e) { e.preventDefault(); unconnect(index); }}
                  ></em>
                </a>
              </div>
            );
          })}
        </div>

        <h3 className="with-line">Send Email Notifications</h3>

        <div className="notification row clearfix">
          <div className="col-sm-6">
            {switchLabels.slice(0, 3).map(function (label, i) {
              return (
                <div className="form-group row clearfix" key={i}>
                  <label className="col-xs-8">{label}</label>
                  <div className="col-xs-4">
                    <SwitchToggle checked={switches[i]} onChange={function () { toggleSwitch(i); }} color="primary" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-sm-6">
            {switchLabels.slice(3).map(function (label, i) {
              return (
                <div className="form-group row clearfix" key={i + 3}>
                  <label className="col-xs-8">{label}</label>
                  <div className="col-xs-4">
                    <SwitchToggle checked={switches[i + 3]} onChange={function () { toggleSwitch(i + 3); }} color="primary" />
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
        onClose={function () { setModalOpen(false); setModalTarget(null); }}
        onSave={handleModalSave}
      />
    </Panel>
  );
}

export default ProfilePage;
