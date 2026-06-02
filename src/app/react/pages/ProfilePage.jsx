/**
 * ProfilePage — React equivalent of ProfilePageCtrl + profile.html.
 *
 * Uses the shared <Panel> component and useFileReader hook.
 * Initialises bootstrap-switch on toggle checkboxes after mount.
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Panel } from '../components/Panel';
import { useFileReader } from '../hooks/useFileReader';
import { profilePicture } from '../utils/profilePicture';
import { ProfileModal } from './ProfileModal';

var IMAGES_ROOT = 'assets/img/';
var NO_PHOTO = IMAGES_ROOT + 'theme/no-photo.png';

var INITIAL_SOCIAL_PROFILES = [
  { name: 'Facebook',      href: 'https://www.facebook.com/akveo/', icon: 'socicon-facebook' },
  { name: 'Twitter',       href: 'https://twitter.com/akveo_inc',   icon: 'socicon-twitter' },
  { name: 'Google',        href: undefined,                          icon: 'socicon-google' },
  { name: 'LinkedIn',      href: 'https://www.linkedin.com/company/akveo', icon: 'socicon-linkedin' },
  { name: 'GitHub',        href: 'https://github.com/akveo',        icon: 'socicon-github' },
  { name: 'StackOverflow', href: undefined,                          icon: 'socicon-stackoverflow' },
  { name: 'Dribbble',      href: undefined,                          icon: 'socicon-dribble' },
  { name: 'Behance',       href: undefined,                          icon: 'socicon-behace' }
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

export function ProfilePage() {
  var [picture, setPicture] = useState(profilePicture('Nasta'));
  var [noPicture, setNoPicture] = useState(false);
  var [socialProfiles, setSocialProfiles] = useState(INITIAL_SOCIAL_PROFILES);
  var [switches, setSwitches] = useState(INITIAL_SWITCHES);
  var [modalOpen, setModalOpen] = useState(false);
  var [modalTarget, setModalTarget] = useState(null);
  var fileInputRef = useRef(null);
  var switchContainerRef = useRef(null);
  var { readAsDataUrl } = useFileReader();

  // Initialise bootstrap-switch jQuery plugin on mount
  useEffect(function () {
    if (!switchContainerRef.current) return;
    var $ = window.jQuery;
    var $inputs = $(switchContainerRef.current).find('input[type="checkbox"]');
    $inputs.each(function (i, el) {
      $(el).bootstrapSwitch({ size: 'small', onColor: 'primary' });
      $(el).on('switchChange.bootstrapSwitch', function (event, state) {
        setSwitches(function (prev) {
          var next = prev.slice();
          next[i] = state;
          return next;
        });
      });
    });
  }, []);

  var removePicture = useCallback(function () {
    setPicture(NO_PHOTO);
    setNoPicture(true);
  }, []);

  var uploadPicture = useCallback(function () {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  var handleFileChange = useCallback(function (e) {
    var file = e.target.files && e.target.files[0];
    if (file) {
      readAsDataUrl(file).then(function (result) {
        setPicture(result);
        setNoPicture(false);
      });
    }
  }, [readAsDataUrl]);

  var unconnect = useCallback(function (index) {
    setSocialProfiles(function (prev) {
      var next = prev.slice();
      next[index] = Object.assign({}, next[index], { href: undefined });
      return next;
    });
  }, []);

  var showModal = useCallback(function (index) {
    setModalTarget(index);
    setModalOpen(true);
  }, []);

  var handleModalSave = useCallback(function (link) {
    if (modalTarget !== null) {
      setSocialProfiles(function (prev) {
        var next = prev.slice();
        next[modalTarget] = Object.assign({}, next[modalTarget], { href: link });
        return next;
      });
    }
    setModalOpen(false);
    setModalTarget(null);
  }, [modalTarget]);

  var handleModalClose = useCallback(function () {
    setModalOpen(false);
    setModalTarget(null);
  }, []);

  // Build the left and right columns of switches
  var leftSwitches = SWITCH_LABELS.slice(0, 3);
  var rightSwitches = SWITCH_LABELS.slice(3, 6);

  return React.createElement(Panel, { panelClass: 'profile-page' },
    React.createElement('div', { className: 'panel-content' },

      // Progress
      React.createElement('div', { className: 'progress-info' }, 'Your profile is 70% Complete'),
      React.createElement('div', { className: 'progress' },
        React.createElement('div', {
          className: 'progress-bar progress-bar-primary progress-bar-striped active',
          role: 'progressbar',
          'aria-valuenow': '70',
          'aria-valuemin': '0',
          'aria-valuemax': '100',
          style: { width: '70%' }
        })
      ),

      // General Information
      React.createElement('h3', { className: 'with-line' }, 'General Information'),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputFirstName', className: 'col-sm-3 control-label' }, 'Picture'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('div', { className: 'userpic' },
                React.createElement('div', { className: 'userpic-wrapper' },
                  React.createElement('img', { src: picture, onClick: uploadPicture })
                ),
                !noPicture ? React.createElement('i', {
                  className: 'ion-ios-close-outline',
                  onClick: removePicture
                }) : null,
                React.createElement('a', {
                  href: '',
                  className: 'change-userpic',
                  onClick: function (e) { e.preventDefault(); uploadPicture(); }
                }, 'Change Profile Picture'),
                React.createElement('input', {
                  type: 'file',
                  style: { display: 'none' },
                  id: 'uploadFile',
                  ref: fileInputRef,
                  onChange: handleFileChange
                })
              )
            )
          )
        ),
        React.createElement('div', { className: 'col-md-6' })
      ),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputFirstName', className: 'col-sm-3 control-label' }, 'First Name'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'text', className: 'form-control', id: 'inputFirstName', placeholder: '', defaultValue: 'Anastasiya' })
            )
          ),
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputLastName', className: 'col-sm-3 control-label' }, 'Last Name'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'text', className: 'form-control', id: 'inputLastName', placeholder: '', defaultValue: '' })
            )
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { className: 'col-sm-3 control-label' }, 'Department'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('select', { className: 'form-control', selectpicker: '' },
                React.createElement('option', null, 'Web Development'),
                React.createElement('option', null, 'System Development'),
                React.createElement('option', null, 'Sales'),
                React.createElement('option', null, 'Human Resources')
              )
            )
          ),
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputOccupation', className: 'col-sm-3 control-label' }, 'Occupation'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'text', className: 'form-control', id: 'inputOccupation', placeholder: '', defaultValue: 'Front End Web Developer' })
            )
          )
        )
      ),

      // Change Password
      React.createElement('h3', { className: 'with-line' }, 'Change Password'),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputPassword', className: 'col-sm-3 control-label' }, 'Password'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword', placeholder: '', defaultValue: '12345678' })
            )
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputConfirmPassword', className: 'col-sm-3 control-label' }, 'Confirm Password'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'password', className: 'form-control', id: 'inputConfirmPassword', placeholder: '' })
            )
          )
        )
      ),

      // Contact Information
      React.createElement('h3', { className: 'with-line' }, 'Contact Information'),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputEmail3', className: 'col-sm-3 control-label' }, 'Email'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'email', className: 'form-control', id: 'inputEmail3', placeholder: '', defaultValue: 'contact@akveo.com' })
            )
          ),
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputPhone', className: 'col-sm-3 control-label' }, 'Phone'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'text', className: 'form-control', id: 'inputPhone', placeholder: '', defaultValue: '+1 (23) 456 7890' })
            )
          )
        ),
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { className: 'col-sm-3 control-label' }, 'Office Location'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('select', { className: 'form-control', title: 'Standard Select', selectpicker: '' },
                React.createElement('option', null, 'San Francisco'),
                React.createElement('option', null, 'London'),
                React.createElement('option', null, 'Minsk'),
                React.createElement('option', null, 'Tokio')
              )
            )
          ),
          React.createElement('div', { className: 'form-group row clearfix' },
            React.createElement('label', { htmlFor: 'inputRoom', className: 'col-sm-3 control-label' }, 'Room'),
            React.createElement('div', { className: 'col-sm-9' },
              React.createElement('input', { type: 'text', className: 'form-control', id: 'inputRoom', placeholder: '', defaultValue: '303' })
            )
          )
        )
      ),

      // Social Profiles
      React.createElement('h3', { className: 'with-line' }, 'Social Profiles'),
      React.createElement('div', { className: 'social-profiles row clearfix' },
        socialProfiles.map(function (item, index) {
          return React.createElement('div', { className: 'col-md-3 col-sm-4', key: item.name },
            !item.href
              ? React.createElement('a', {
                  className: 'sn-link',
                  href: '',
                  onClick: function (e) { e.preventDefault(); showModal(index); }
                },
                  React.createElement('i', { className: 'socicon ' + item.icon }),
                  React.createElement('span', null, item.name)
                )
              : React.createElement('a', {
                  className: 'sn-link connected',
                  href: item.href,
                  target: '_blank'
                },
                  React.createElement('i', { className: 'socicon ' + item.icon }),
                  React.createElement('span', null, item.name),
                  React.createElement('em', {
                    className: 'ion-ios-close-empty sn-link-close',
                    onClick: function (e) { e.preventDefault(); e.stopPropagation(); unconnect(index); }
                  })
                )
          );
        })
      ),

      // Send Email Notifications
      React.createElement('h3', { className: 'with-line' }, 'Send Email Notifications'),
      React.createElement('div', { className: 'notification row clearfix', ref: switchContainerRef },
        React.createElement('div', { className: 'col-sm-6' },
          leftSwitches.map(function (label, i) {
            return React.createElement('div', { className: 'form-group row clearfix', key: i },
              React.createElement('label', { className: 'col-xs-8' }, label),
              React.createElement('div', { className: 'col-xs-4' },
                React.createElement('div', { className: 'switch-container primary' },
                  React.createElement('input', {
                    type: 'checkbox',
                    defaultChecked: INITIAL_SWITCHES[i]
                  })
                )
              )
            );
          })
        ),
        React.createElement('div', { className: 'col-sm-6' },
          rightSwitches.map(function (label, i) {
            var switchIndex = i + 3;
            return React.createElement('div', { className: 'form-group row clearfix', key: switchIndex },
              React.createElement('label', { className: 'col-xs-8' }, label),
              React.createElement('div', { className: 'col-xs-4' },
                React.createElement('div', { className: 'switch-container primary' },
                  React.createElement('input', {
                    type: 'checkbox',
                    defaultChecked: INITIAL_SWITCHES[switchIndex]
                  })
                )
              )
            );
          })
        )
      ),

      // Update Profile button
      React.createElement('button', {
        type: 'button',
        className: 'btn btn-primary btn-with-icon save-profile'
      },
        React.createElement('i', { className: 'ion-android-checkmark-circle' }),
        'Update Profile'
      )
    ),

    // Modal
    React.createElement(ProfileModal, {
      isOpen: modalOpen,
      onSave: handleModalSave,
      onClose: handleModalClose
    })
  );
}
