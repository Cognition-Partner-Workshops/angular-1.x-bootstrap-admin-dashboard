(function (window) {
  'use strict';

  var h = React.createElement;
  var useEffect = React.useEffect;
  var useState = React.useState;

  var initialSocialProfiles = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/akveo/',
      icon: 'socicon-facebook'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/akveo_inc',
      icon: 'socicon-twitter'
    },
    {
      name: 'Google',
      icon: 'socicon-google'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/akveo',
      icon: 'socicon-linkedin'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/akveo',
      icon: 'socicon-github'
    },
    {
      name: 'StackOverflow',
      icon: 'socicon-stackoverflow'
    },
    {
      name: 'Dribbble',
      icon: 'socicon-dribble'
    },
    {
      name: 'Behance',
      icon: 'socicon-behace'
    }
  ];

  function copySocialProfiles() {
    return initialSocialProfiles.map(function (profile) {
      return {
        name: profile.name,
        href: profile.href,
        icon: profile.icon
      };
    });
  }

  function AddAccountModal(props) {
    var linkState = useState('');
    var link = linkState[0];
    var setLink = linkState[1];

    useEffect(function () {
      document.body.classList.add('modal-open');
      return function () {
        document.body.classList.remove('modal-open');
      };
    }, []);

    return ReactDOM.createPortal(
      h(
        React.Fragment,
        null,
        h(
          'div',
          {
            className: 'modal fade in',
            role: 'dialog',
            tabIndex: '-1',
            style: { display: 'block' }
          },
          h(
            'div',
            { className: 'modal-dialog' },
            h(
              'div',
              { className: 'modal-content' },
              h(
                'div',
                { className: 'modal-header' },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'close',
                    'aria-label': 'Close',
                    onClick: props.onDismiss
                  },
                  h('em', { className: 'ion-ios-close-empty sn-link-close' })
                ),
                h('h4', { className: 'modal-title', id: 'myModalLabel' }, 'Add Account')
              ),
              h(
                'form',
                {
                  onSubmit: function (event) {
                    event.preventDefault();
                    props.onSave(link);
                  }
                },
                h(
                  'div',
                  { className: 'modal-body' },
                  h('p', null, 'Paste a link to your profile into the box below'),
                  h(
                    'div',
                    { className: 'form-group' },
                    h('input', {
                      type: 'text',
                      className: 'form-control',
                      placeholder: 'Link to Profile',
                      value: link,
                      onChange: function (event) {
                        setLink(event.target.value);
                      }
                    })
                  )
                ),
                h(
                  'div',
                  { className: 'modal-footer' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'btn btn-primary',
                      onClick: function () {
                        props.onSave(link);
                      }
                    },
                    'Save changes'
                  )
                )
              )
            )
          )
        ),
        h('div', { className: 'modal-backdrop fade in' })
      ),
      document.body
    );
  }

  function NotificationSwitch(props) {
    return h(
      'div',
      {
        className: 'switch-container primary',
        onClick: function () {
          props.onToggle(!props.checked);
        }
      },
      h('input', {
        type: 'checkbox',
        checked: props.checked,
        readOnly: true,
        style: { pointerEvents: 'none' }
      })
    );
  }

  function ProfilePage(props) {
    var layoutPaths = props.layoutPaths;
    var pictureState = useState(layoutPaths.images.profile + 'Nasta.png');
    var picture = pictureState[0];
    var setPicture = pictureState[1];
    var noPictureState = useState(false);
    var noPicture = noPictureState[0];
    var setNoPicture = noPictureState[1];
    var socialState = useState(copySocialProfiles);
    var socialProfiles = socialState[0];
    var setSocialProfiles = socialState[1];
    var switchState = useState([true, true, false, true, true, false]);
    var switches = switchState[0];
    var setSwitches = switchState[1];
    var pendingState = useState(null);
    var pendingProfileName = pendingState[0];
    var setPendingProfileName = pendingState[1];
    var fileInput;

    function uploadPicture(event) {
      if (event) {
        event.preventDefault();
      }
      if (fileInput) {
        fileInput.click();
      }
    }

    function removePicture() {
      setPicture(layoutPaths.images.root + 'theme/no-photo.png');
      setNoPicture(true);
    }

    function disconnectProfile(event, profileName) {
      event.preventDefault();
      event.stopPropagation();
      setSocialProfiles(function (profiles) {
        return profiles.map(function (profile) {
          if (profile.name === profileName) {
            return {
              name: profile.name,
              icon: profile.icon,
              href: undefined
            };
          }
          return profile;
        });
      });
    }

    function toggleSwitch(index, checked) {
      setSwitches(function (current) {
        return current.map(function (value, currentIndex) {
          return currentIndex === index ? checked : value;
        });
      });
    }

    function saveProfileLink(link) {
      setSocialProfiles(function (profiles) {
        return profiles.map(function (profile) {
          if (profile.name === pendingProfileName) {
            return {
              name: profile.name,
              icon: profile.icon,
              href: link
            };
          }
          return profile;
        });
      });
      setPendingProfileName(null);
    }

    var pictureBlock = h(
      'div',
      { className: 'userpic' },
      h(
        'div',
        { className: 'userpic-wrapper' },
        h('img', {
          src: picture,
          onClick: uploadPicture
        })
      ),
      !noPicture
        ? h('i', {
            className: 'ion-ios-close-outline',
            onClick: removePicture
          })
        : null,
      h(
        'a',
        {
          href: '',
          className: 'change-userpic',
          onClick: uploadPicture
        },
        'Change Profile Picture'
      ),
      h('input', {
        type: 'file',
        id: 'uploadFile',
        ref: function (element) {
          fileInput = element;
        },
        style: { display: 'none' }
      })
    );

    var socialLinks = socialProfiles.map(function (profile) {
      if (profile.href) {
        return h(
          'div',
          { className: 'col-md-3 col-sm-4', key: profile.name },
          h(
            'a',
            {
              className: 'sn-link connected',
              href: profile.href,
              target: '_blank',
              onClick: function (event) {
                event.preventDefault();
                event.stopPropagation();
              }
            },
            h('i', { className: 'socicon ' + profile.icon }),
            h('span', null, profile.name),
            h('em', {
              className: 'ion-ios-close-empty sn-link-close',
              onMouseDown: function (event) {
                disconnectProfile(event, profile.name);
              },
              onClick: function (event) {
                event.preventDefault();
                event.stopPropagation();
              }
            })
          )
        );
      }

      return h(
        'div',
        { className: 'col-md-3 col-sm-4', key: profile.name },
        h(
          'a',
          {
            className: 'sn-link',
            href: '',
            onClick: function (event) {
              event.preventDefault();
              setPendingProfileName(profile.name);
            }
          },
          h('i', { className: 'socicon ' + profile.icon }),
          h('span', null, profile.name)
        )
      );
    });

    var notificationSwitches = switches.map(function (checked, index) {
      return h(NotificationSwitch, {
        key: index,
        checked: checked,
        onToggle: function (value) {
          toggleSwitch(index, value);
        }
      });
    });

    return h(
      React.Fragment,
      null,
      h(
        'div',
        { className: 'panel-content' },
        h('div', { className: 'progress-info' }, 'Your profile is 70% Complete'),
        h(
          'div',
          { className: 'progress' },
          h('div', {
            className: 'progress-bar progress-bar-primary progress-bar-striped active',
            role: 'progressbar',
            'aria-valuenow': '70',
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            style: { width: '70%' }
          })
        ),
        h('h3', { className: 'with-line' }, 'General Information'),
        h(
          'div',
          { className: 'row' },
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputFirstName', className: 'col-sm-3 control-label' }, 'Picture'),
              h('div', { className: 'col-sm-9' }, pictureBlock)
            )
          ),
          h('div', { className: 'col-md-6' })
        ),
        h(
          'div',
          { className: 'row' },
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputFirstName', className: 'col-sm-3 control-label' }, 'First Name'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'text',
                  className: 'form-control',
                  id: 'inputFirstName',
                  placeholder: '',
                  defaultValue: 'Anastasiya'
                })
              )
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputLastName', className: 'col-sm-3 control-label' }, 'Last Name'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'text',
                  className: 'form-control',
                  id: 'inputLastName',
                  placeholder: '',
                  defaultValue: ''
                })
              )
            )
          ),
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-sm-3 control-label' }, 'Department'),
              h(
                'div',
                { className: 'col-sm-9' },
                h(
                  'select',
                  { className: 'form-control', defaultValue: 'Web Development' },
                  h('option', { value: 'Web Development' }, 'Web Development'),
                  h('option', { value: 'System Development' }, 'System Development'),
                  h('option', { value: 'Sales' }, 'Sales'),
                  h('option', { value: 'Human Resources' }, 'Human Resources')
                )
              )
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputOccupation', className: 'col-sm-3 control-label' }, 'Occupation'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'text',
                  className: 'form-control',
                  id: 'inputOccupation',
                  placeholder: '',
                  defaultValue: 'Front End Web Developer'
                })
              )
            )
          )
        ),
        h('h3', { className: 'with-line' }, 'Change Password'),
        h(
          'div',
          { className: 'row' },
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputPassword', className: 'col-sm-3 control-label' }, 'Password'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'password',
                  className: 'form-control',
                  id: 'inputPassword',
                  placeholder: '',
                  defaultValue: '12345678'
                })
              )
            )
          ),
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h(
                'label',
                { htmlFor: 'inputConfirmPassword', className: 'col-sm-3 control-label' },
                'Confirm Password'
              ),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'password',
                  className: 'form-control',
                  id: 'inputConfirmPassword',
                  placeholder: '',
                  defaultValue: ''
                })
              )
            )
          )
        ),
        h('h3', { className: 'with-line' }, 'Contact Information'),
        h(
          'div',
          { className: 'row' },
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputEmail3', className: 'col-sm-3 control-label' }, 'Email'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'email',
                  className: 'form-control',
                  id: 'inputEmail3',
                  placeholder: '',
                  defaultValue: 'contact@akveo.com'
                })
              )
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputPhone', className: 'col-sm-3 control-label' }, 'Phone'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'text',
                  className: 'form-control',
                  id: 'inputPhone',
                  placeholder: '',
                  defaultValue: '+1 (23) 456 7890'
                })
              )
            )
          ),
          h(
            'div',
            { className: 'col-md-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-sm-3 control-label' }, 'Office Location'),
              h(
                'div',
                { className: 'col-sm-9' },
                h(
                  'select',
                  {
                    className: 'form-control',
                    title: 'Standard Select',
                    defaultValue: 'San Francisco'
                  },
                  h('option', { value: 'San Francisco' }, 'San Francisco'),
                  h('option', { value: 'London' }, 'London'),
                  h('option', { value: 'Minsk' }, 'Minsk'),
                  h('option', { value: 'Tokio' }, 'Tokio')
                )
              )
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { htmlFor: 'inputRoom', className: 'col-sm-3 control-label' }, 'Room'),
              h(
                'div',
                { className: 'col-sm-9' },
                h('input', {
                  type: 'text',
                  className: 'form-control',
                  id: 'inputRoom',
                  placeholder: '',
                  defaultValue: '303'
                })
              )
            )
          )
        ),
        h('h3', { className: 'with-line' }, 'Social Profiles'),
        h('div', { className: 'social-profiles row clearfix' }, socialLinks),
        h('h3', { className: 'with-line' }, 'Send Email Notifications'),
        h(
          'div',
          { className: 'notification row clearfix' },
          h(
            'div',
            { className: 'col-sm-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-xs-8' }, 'When I receive a message'),
              h('div', { className: 'col-xs-4' }, notificationSwitches[0])
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-xs-8' }, 'When Someone sends me an invitation'),
              h('div', { className: 'col-xs-4' }, notificationSwitches[1])
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-xs-8' }, 'When profile information changes'),
              h('div', { className: 'col-xs-4' }, notificationSwitches[2])
            )
          ),
          h(
            'div',
            { className: 'col-sm-6' },
            h(
              'div',
              { className: 'form-group row clearfix' },
              h(
                'label',
                { className: 'col-xs-8' },
                'When anyone logs into your account from a new device or browser'
              ),
              h('div', { className: 'col-xs-4' }, notificationSwitches[3])
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-xs-8' }, 'Weekly Reports'),
              h('div', { className: 'col-xs-4' }, notificationSwitches[4])
            ),
            h(
              'div',
              { className: 'form-group row clearfix' },
              h('label', { className: 'col-xs-8' }, 'Daily Reports'),
              h('div', { className: 'col-xs-4' }, notificationSwitches[5])
            )
          )
        ),
        h(
          'button',
          { type: 'button', className: 'btn btn-primary btn-with-icon save-profile' },
          h('i', { className: 'ion-android-checkmark-circle' }),
          'Update Profile'
        )
      ),
      pendingProfileName
        ? h(AddAccountModal, {
            key: pendingProfileName,
            profileName: pendingProfileName,
            onDismiss: function () {
              setPendingProfileName(null);
            },
            onSave: saveProfileLink
          })
        : null
    );
  }

  var mountedElement = null;

  window.mountProfileReact = function (element, props) {
    if (mountedElement && mountedElement !== element) {
      ReactDOM.unmountComponentAtNode(mountedElement);
    }
    mountedElement = element;
    ReactDOM.render(h(ProfilePage, props), element);
  };

  window.unmountProfileReact = function () {
    if (mountedElement) {
      ReactDOM.unmountComponentAtNode(mountedElement);
      mountedElement = null;
    }
  };
})(window);
