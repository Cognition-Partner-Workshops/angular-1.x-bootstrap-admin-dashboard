/**
 * React implementation of the Profile page.
 * Replaces ProfilePageCtrl.js, ProfileModalCtrl.js, profile.html, profileModal.html.
 *
 * Uses React.createElement (no JSX) so no build-tool changes are required.
 */
(function () {
  'use strict';

  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var Fragment = React.Fragment;

  // ── Constants ────────────────────────────────────────────────────────
  var PROFILE_IMG_PATH = 'assets/img/app/profile/';
  var NO_PHOTO_PATH = 'assets/img/theme/no-photo.png';

  var INITIAL_SOCIAL_PROFILES = [
    { name: 'Facebook', href: 'https://www.facebook.com/akveo/', icon: 'socicon-facebook' },
    { name: 'Twitter', href: 'https://twitter.com/akveo_inc', icon: 'socicon-twitter' },
    { name: 'Google', href: null, icon: 'socicon-google' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/akveo', icon: 'socicon-linkedin' },
    { name: 'GitHub', href: 'https://github.com/akveo', icon: 'socicon-github' },
    { name: 'StackOverflow', href: null, icon: 'socicon-stackoverflow' },
    { name: 'Dribbble', href: null, icon: 'socicon-dribble' },
    { name: 'Behance', href: null, icon: 'socicon-behace' }
  ];

  var INITIAL_SWITCHES = [true, true, false, true, true, false];

  var SWITCH_LABELS_LEFT = [
    'When I receive a message',
    'When Someone sends me an invitation',
    'When profile information changes'
  ];

  var SWITCH_LABELS_RIGHT = [
    'When anyone logs into your account from a new device or browser',
    'Weekly Reports',
    'Daily Reports'
  ];

  // ── Minimal Hash Router ─────────────────────────────────────────────
  var RouterContext = React.createContext({ path: '' });

  function HashRouter(props) {
    var getPath = function () {
      return window.location.hash.replace(/^#/, '') || '/';
    };
    var state = useState(getPath);
    var path = state[0];
    var setPath = state[1];

    useEffect(function () {
      function onHashChange() { setPath(getPath()); }
      window.addEventListener('hashchange', onHashChange);
      return function () { window.removeEventListener('hashchange', onHashChange); };
    }, []);

    return h(RouterContext.Provider, { value: { path: path } }, props.children);
  }

  function Route(props) {
    var ctx = React.useContext(RouterContext);
    if (ctx.path === props.path) {
      return typeof props.component === 'function' ? h(props.component) : props.children;
    }
    return null;
  }

  // ── ProfileModal Component ──────────────────────────────────────────
  function ProfileModal(props) {
    var state = useState('');
    var link = state[0];
    var setLink = state[1];

    useEffect(function () {
      if (props.isOpen) { setLink(''); }
    }, [props.isOpen]);

    if (!props.isOpen) { return null; }

    return ReactDOM.createPortal(
      h('div', null,
        h('div', { className: 'modal', style: { display: 'block' }, role: 'dialog' },
          h('div', { className: 'modal-dialog' },
            h('div', { className: 'modal-content' },
              h('div', { className: 'modal-header' },
                h('button', {
                  type: 'button', className: 'close', 'aria-label': 'Close',
                  onClick: props.onDismiss
                }, h('em', { className: 'ion-ios-close-empty sn-link-close' })),
                h('h4', { className: 'modal-title', id: 'myModalLabel' }, 'Add Account')
              ),
              h('form', { name: 'linkForm' },
                h('div', { className: 'modal-body' },
                  h('p', null, 'Paste a link to your profile into the box below'),
                  h('div', { className: 'form-group' },
                    h('input', {
                      type: 'text', className: 'form-control',
                      placeholder: 'Link to Profile',
                      value: link,
                      onChange: function (e) { setLink(e.target.value); }
                    })
                  )
                ),
                h('div', { className: 'modal-footer' },
                  h('button', {
                    type: 'button', className: 'btn btn-primary',
                    onClick: function () { props.onSave(link); }
                  }, 'Save changes')
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

  // ── BootstrapSwitch Component ───────────────────────────────────────
  function BootstrapSwitch(props) {
    var inputRef = useRef(null);
    var initialized = useRef(false);

    useEffect(function () {
      if (inputRef.current && !initialized.current && window.$ && $.fn.bootstrapSwitch) {
        $(inputRef.current).bootstrapSwitch({
          size: 'small',
          onColor: props.color || 'primary',
          state: props.checked
        });
        $(inputRef.current).on('switchChange.bootstrapSwitch', function (event, state) {
          if (props.onChange) { props.onChange(state); }
        });
        initialized.current = true;
      }
    }, []);

    useEffect(function () {
      if (initialized.current && inputRef.current) {
        $(inputRef.current).bootstrapSwitch('state', props.checked, true);
      }
    }, [props.checked]);

    return h('div', { className: 'switch-container ' + (props.color || 'primary') },
      h('input', { type: 'checkbox', ref: inputRef, defaultChecked: props.checked })
    );
  }

  // ── ProfilePage Component ───────────────────────────────────────────
  function ProfilePage() {
    var picState = useState(PROFILE_IMG_PATH + 'Nasta.png');
    var picture = picState[0];
    var setPicture = picState[1];

    var noPicState = useState(false);
    var noPicture = noPicState[0];
    var setNoPicture = noPicState[1];

    var spState = useState(INITIAL_SOCIAL_PROFILES.map(function (p) {
      return { name: p.name, href: p.href, icon: p.icon };
    }));
    var socialProfiles = spState[0];
    var setSocialProfiles = spState[1];

    var swState = useState(INITIAL_SWITCHES.slice());
    var switches = swState[0];
    var setSwitches = swState[1];

    var modalState = useState({ open: false, index: -1 });
    var modal = modalState[0];
    var setModal = modalState[1];

    var fileInputRef = useRef(null);

    // ── Actions ──
    var removePicture = function () {
      setPicture(NO_PHOTO_PATH);
      setNoPicture(true);
    };

    var uploadPicture = function () {
      if (fileInputRef.current) { fileInputRef.current.click(); }
    };

    var handleFileChange = function (e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (ev) { setPicture(ev.target.result); };
        reader.readAsDataURL(file);
      }
    };

    var unconnect = function (index) {
      setSocialProfiles(function (prev) {
        var next = prev.slice();
        next[index] = { name: next[index].name, href: null, icon: next[index].icon };
        return next;
      });
    };

    var showModal = function (index) { setModal({ open: true, index: index }); };
    var dismissModal = function () { setModal({ open: false, index: -1 }); };
    var saveModal = function (link) {
      var idx = modal.index;
      if (idx >= 0) {
        setSocialProfiles(function (prev) {
          var next = prev.slice();
          next[idx] = { name: next[idx].name, href: link, icon: next[idx].icon };
          return next;
        });
      }
      setModal({ open: false, index: -1 });
    };

    var toggleSwitch = function (index, state) {
      setSwitches(function (prev) {
        var next = prev.slice();
        next[index] = state;
        return next;
      });
    };

    // ── Helpers ──
    function formGroup(labelText, labelFor, inputEl) {
      return h('div', { className: 'form-group row clearfix' },
        h('label', { htmlFor: labelFor, className: 'col-sm-3 control-label' }, labelText),
        h('div', { className: 'col-sm-9' }, inputEl)
      );
    }

    function renderSocialLink(item, i) {
      if (item.href) {
        return h('div', { className: 'col-md-3 col-sm-4', key: item.name },
          h('a', { className: 'sn-link connected', href: item.href, target: '_blank' },
            h('i', { className: 'socicon ' + item.icon }),
            h('span', null, item.name),
            h('em', {
              className: 'ion-ios-close-empty sn-link-close',
              onMouseDown: function (e) { e.preventDefault(); e.stopPropagation(); unconnect(i); }
            })
          )
        );
      }
      return h('div', { className: 'col-md-3 col-sm-4', key: item.name },
        h('a', {
          className: 'sn-link', href: '#',
          onClick: function (e) { e.preventDefault(); showModal(i); }
        },
          h('i', { className: 'socicon ' + item.icon }),
          h('span', null, item.name)
        )
      );
    }

    function renderSwitch(index, label) {
      return h('div', { className: 'form-group row clearfix', key: 'switch-' + index },
        h('label', { className: 'col-xs-8' }, label),
        h('div', { className: 'col-xs-4' },
          h(BootstrapSwitch, {
            color: 'primary',
            checked: switches[index],
            onChange: function (state) { toggleSwitch(index, state); }
          })
        )
      );
    }

    // ── Render ──
    return h(Fragment, null,
      h('div', { className: 'panel profile-page' },
        h('div', { className: 'panel-body' },
          h('div', { className: 'panel-content' },

            // ── Progress ──
            h('div', { className: 'progress-info' }, 'Your profile is 70% Complete'),
            h('div', { className: 'progress' },
              h('div', {
                className: 'progress-bar progress-bar-primary progress-bar-striped active',
                role: 'progressbar',
                'aria-valuenow': '70', 'aria-valuemin': '0', 'aria-valuemax': '100',
                style: { width: '70%' }
              })
            ),

            // ── General Information ──
            h('h3', { className: 'with-line' }, 'General Information'),

            h('div', { className: 'row' },
              h('div', { className: 'col-md-6' },
                h('div', { className: 'form-group row clearfix' },
                  h('label', { htmlFor: 'inputFirstName', className: 'col-sm-3 control-label' }, 'Picture'),
                  h('div', { className: 'col-sm-9' },
                    h('div', { className: 'userpic' },
                      h('div', { className: 'userpic-wrapper' },
                        h('img', { src: picture, onClick: uploadPicture })
                      ),
                      !noPicture ? h('i', { className: 'ion-ios-close-outline', onClick: removePicture }) : null,
                      h('a', { href: '#', className: 'change-userpic', onClick: function (e) { e.preventDefault(); uploadPicture(); } }, 'Change Profile Picture'),
                      h('input', { type: 'file', style: { display: 'none' }, id: 'uploadFile', ref: fileInputRef, onChange: handleFileChange })
                    )
                  )
                )
              ),
              h('div', { className: 'col-md-6' })
            ),

            h('div', { className: 'row' },
              h('div', { className: 'col-md-6' },
                formGroup('First Name', 'inputFirstName',
                  h('input', { type: 'text', className: 'form-control', id: 'inputFirstName', defaultValue: 'Anastasiya' })
                ),
                formGroup('Last Name', 'inputLastName',
                  h('input', { type: 'text', className: 'form-control', id: 'inputLastName', defaultValue: '' })
                )
              ),
              h('div', { className: 'col-md-6' },
                h('div', { className: 'form-group row clearfix' },
                  h('label', { className: 'col-sm-3 control-label' }, 'Department'),
                  h('div', { className: 'col-sm-9' },
                    h('select', { className: 'form-control', selectpicker: '', defaultValue: 'Web Development' },
                      h('option', null, 'Web Development'),
                      h('option', null, 'System Development'),
                      h('option', null, 'Sales'),
                      h('option', null, 'Human Resources')
                    )
                  )
                ),
                formGroup('Occupation', 'inputOccupation',
                  h('input', { type: 'text', className: 'form-control', id: 'inputOccupation', defaultValue: 'Front End Web Developer' })
                )
              )
            ),

            // ── Change Password ──
            h('h3', { className: 'with-line' }, 'Change Password'),
            h('div', { className: 'row' },
              h('div', { className: 'col-md-6' },
                formGroup('Password', 'inputPassword',
                  h('input', { type: 'password', className: 'form-control', id: 'inputPassword', defaultValue: '12345678' })
                )
              ),
              h('div', { className: 'col-md-6' },
                formGroup('Confirm Password', 'inputConfirmPassword',
                  h('input', { type: 'password', className: 'form-control', id: 'inputConfirmPassword', defaultValue: '' })
                )
              )
            ),

            // ── Contact Information ──
            h('h3', { className: 'with-line' }, 'Contact Information'),
            h('div', { className: 'row' },
              h('div', { className: 'col-md-6' },
                formGroup('Email', 'inputEmail3',
                  h('input', { type: 'email', className: 'form-control', id: 'inputEmail3', defaultValue: 'contact@akveo.com' })
                ),
                formGroup('Phone', 'inputPhone',
                  h('input', { type: 'text', className: 'form-control', id: 'inputPhone', defaultValue: '+1 (23) 456 7890' })
                )
              ),
              h('div', { className: 'col-md-6' },
                h('div', { className: 'form-group row clearfix' },
                  h('label', { className: 'col-sm-3 control-label' }, 'Office Location'),
                  h('div', { className: 'col-sm-9' },
                    h('select', { className: 'form-control', selectpicker: '', title: 'Standard Select', defaultValue: 'San Francisco' },
                      h('option', null, 'San Francisco'),
                      h('option', null, 'London'),
                      h('option', null, 'Minsk'),
                      h('option', null, 'Tokio')
                    )
                  )
                ),
                formGroup('Room', 'inputRoom',
                  h('input', { type: 'text', className: 'form-control', id: 'inputRoom', defaultValue: '303' })
                )
              )
            ),

            // ── Social Profiles ──
            h('h3', { className: 'with-line' }, 'Social Profiles'),
            h('div', { className: 'social-profiles row clearfix' },
              socialProfiles.map(function (item, i) { return renderSocialLink(item, i); })
            ),

            // ── Notification Switches ──
            h('h3', { className: 'with-line' }, 'Send Email Notifications'),
            h('div', { className: 'notification row clearfix' },
              h('div', { className: 'col-sm-6' },
                SWITCH_LABELS_LEFT.map(function (label, i) { return renderSwitch(i, label); })
              ),
              h('div', { className: 'col-sm-6' },
                SWITCH_LABELS_RIGHT.map(function (label, i) { return renderSwitch(i + 3, label); })
              )
            ),

            // ── Save Button ──
            h('button', { type: 'button', className: 'btn btn-primary btn-with-icon save-profile' },
              h('i', { className: 'ion-android-checkmark-circle' }),
              'Update Profile'
            )
          )
        )
      ),

      // ── Modal ──
      h(ProfileModal, { isOpen: modal.open, onDismiss: dismissModal, onSave: saveModal })
    );
  }

  // ── App Root (wraps ProfilePage in HashRouter + Route) ──────────────
  function ProfileApp() {
    return h(HashRouter, null,
      h(Route, { path: '/profile', component: ProfilePage })
    );
  }

  // ── Mount / Unmount API ─────────────────────────────────────────────
  var root = null;

  window.mountProfileReact = function (element) {
    if (ReactDOM.createRoot) {
      root = ReactDOM.createRoot(element);
      root.render(h(ProfileApp));
    } else {
      ReactDOM.render(h(ProfileApp), element);
      root = element;
    }
  };

  window.unmountProfileReact = function () {
    if (root) {
      if (root.unmount) {
        root.unmount();
      } else {
        ReactDOM.unmountComponentAtNode(root);
      }
      root = null;
    }
  };

})();
