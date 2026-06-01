import React, { useState, useCallback } from 'react';
import Panel from './Panel';

var types = ['success', 'info', 'warning', 'error'];
var titles = { success: 'Success', info: 'Info', warning: 'Warning', error: 'Error' };
var defaultMessages = {
  success: 'Your information has been saved successfully!',
  info: "You've got a new email!",
  warning: 'Your computer is about to explode!',
  error: "Your information hasn't been saved!"
};

function Notifications() {
  var [options, setOptions] = useState({
    type: 'success',
    title: '',
    msg: '',
    tapToDismiss: true,
    closeButton: false,
    progressBar: false,
    preventDuplicates: false,
    newestOnTop: true,
    positionClass: 'toast-top-right',
    timeOut: '5000',
    extendedTimeOut: '1000',
    maxOpened: '0',
    autoDismiss: false
  });
  var [openedToasts, setOpenedToasts] = useState([]);

  var optionsStr = JSON.stringify(options, null, 2);

  var updateOption = useCallback(function (key, value) {
    setOptions(function (prev) {
      var next = {};
      for (var k in prev) next[k] = prev[k];
      next[key] = value;
      return next;
    });
  }, []);

  var openToast = useCallback(function () {
    var toast = {
      id: Date.now(),
      type: options.type,
      title: options.title || titles[options.type],
      msg: options.msg || defaultMessages[options.type]
    };
    setOpenedToasts(function (prev) {
      return options.newestOnTop ? [toast].concat(prev) : prev.concat([toast]);
    });
    if (options.timeOut && parseInt(options.timeOut, 10) > 0) {
      setTimeout(function () {
        setOpenedToasts(function (prev) { return prev.filter(function (t) { return t.id !== toast.id; }); });
      }, parseInt(options.timeOut, 10));
    }
  }, [options]);

  var openRandomToast = useCallback(function () {
    var type = types[Math.floor(Math.random() * types.length)];
    var toast = {
      id: Date.now(),
      type: type,
      title: titles[type],
      msg: defaultMessages[type]
    };
    setOpenedToasts(function (prev) {
      return options.newestOnTop ? [toast].concat(prev) : prev.concat([toast]);
    });
    if (options.timeOut && parseInt(options.timeOut, 10) > 0) {
      setTimeout(function () {
        setOpenedToasts(function (prev) { return prev.filter(function (t) { return t.id !== toast.id; }); });
      }, parseInt(options.timeOut, 10));
    }
  }, [options]);

  var clearToasts = useCallback(function () { setOpenedToasts([]); }, []);
  var clearLastToast = useCallback(function () {
    setOpenedToasts(function (prev) {
      if (prev.length === 0) return prev;
      return options.newestOnTop ? prev.slice(1) : prev.slice(0, prev.length - 1);
    });
  }, [options.newestOnTop]);

  var dismissToast = useCallback(function (id) {
    setOpenedToasts(function (prev) { return prev.filter(function (t) { return t.id !== id; }); });
  }, []);

  var positionClass = options.positionClass || 'toast-top-right';
  var isTop = positionClass.indexOf('top') !== -1;
  var isRight = positionClass.indexOf('right') !== -1;
  var isCenter = positionClass.indexOf('center') !== -1;
  var isFullWidth = positionClass.indexOf('full-width') !== -1;

  var containerStyle = {
    position: 'fixed',
    zIndex: 9999,
    pointerEvents: 'none'
  };
  if (isTop) containerStyle.top = '12px';
  else containerStyle.bottom = '12px';
  if (isFullWidth) { containerStyle.left = 0; containerStyle.right = 0; }
  else if (isCenter) { containerStyle.left = '50%'; containerStyle.transform = 'translateX(-50%)'; }
  else if (isRight) containerStyle.right = '12px';
  else containerStyle.left = '12px';

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Toastr Notifications" panelClass="with-scroll">
            <div className="row">
              <div className="col-md-2 col-sm-4">
                <div className="control">
                  <label>Toast Type</label>
                  <select className="form-control" value={options.type} onChange={function (e) { updateOption('type', e.target.value); }}>
                    <option value="success">Success</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div className="control">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" value={options.title} onChange={function (e) { updateOption('title', e.target.value); }} placeholder="Enter a title" />
                </div>
                <div className="control">
                  <label htmlFor="message">Message</label>
                  <input type="text" className="form-control" id="message" value={options.msg} onChange={function (e) { updateOption('msg', e.target.value); }} placeholder="Enter a message" />
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.closeButton} onChange={function (e) { updateOption('closeButton', e.target.checked); }} />
                    <span>Close Button</span>
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.progressBar} onChange={function (e) { updateOption('progressBar', e.target.checked); }} />
                    <span>Progress Bar</span>
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.preventDuplicates} onChange={function (e) { updateOption('preventDuplicates', e.target.checked); }} />
                    <span>Prevent Duplicates</span>
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.newestOnTop} onChange={function (e) { updateOption('newestOnTop', e.target.checked); }} />
                    <span>Newest on Top</span>
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.tapToDismiss} onChange={function (e) { updateOption('tapToDismiss', e.target.checked); }} />
                    <span>Tap to Dismiss</span>
                  </label>
                </div>
              </div>
              <div className="col-md-3 col-sm-5">
                <div className="control">
                  <label>Positions</label>
                  {[
                    { value: 'toast-top-right', label: 'Top Right' },
                    { value: 'toast-bottom-right', label: 'Bottom Right' },
                    { value: 'toast-bottom-left', label: 'Bottom Left' },
                    { value: 'toast-top-left', label: 'Top Left' },
                    { value: 'toast-top-full-width', label: 'Top Full Width' },
                    { value: 'toast-bottom-full-width', label: 'Bottom Full Width' },
                    { value: 'toast-top-center', label: 'Top Center' },
                    { value: 'toast-bottom-center', label: 'Bottom Center' }
                  ].map(function (pos) {
                    return (
                      <label className="radio custom-radio" key={pos.value}>
                        <input type="radio" name="positions" value={pos.value} checked={options.positionClass === pos.value} onChange={function () { updateOption('positionClass', pos.value); }} />
                        <span>{pos.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-2 col-sm-3">
                <div className="control">
                  <label htmlFor="timeOut">Time out</label>
                  <input type="text" className="form-control" id="timeOut" value={options.timeOut} onChange={function (e) { updateOption('timeOut', e.target.value); }} placeholder="ms" />
                  <label className="sub-label" htmlFor="timeOut">If you set it to 0, it will stick</label>
                </div>
                <div className="control">
                  <label htmlFor="extendedTimeOut">Extended time out</label>
                  <input type="text" className="form-control" id="extendedTimeOut" value={options.extendedTimeOut} onChange={function (e) { updateOption('extendedTimeOut', e.target.value); }} placeholder="ms" />
                </div>
                <div className="control">
                  <label htmlFor="maxOpened">Maximum number of toasts</label>
                  <input type="text" className="form-control" id="maxOpened" value={options.maxOpened} onChange={function (e) { updateOption('maxOpened', e.target.value); }} />
                  <label htmlFor="maxOpened" className="sub-label">0 means no limit</label>
                </div>
                <div className="control">
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" checked={options.autoDismiss} onChange={function (e) { updateOption('autoDismiss', e.target.checked); }} id="autoDismiss" />
                    <span>Auto dismiss</span>
                  </label>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
                <label>Result:</label>
                <pre className="result-toastr" id="toastrOptions">{optionsStr}</pre>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 button-row">
                <button className="btn btn-primary" onClick={openToast}>Open Toast</button>
                <button className="btn btn-primary" onClick={openRandomToast}>Random Toast</button>
                <button className="btn btn-danger" onClick={clearToasts}>Clear Toasts</button>
                <button className="btn btn-danger" onClick={clearLastToast}>Clear Last Toast</button>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div style={containerStyle}>
        {openedToasts.map(function (toast) {
          return (
            <div key={toast.id} className={'toast toast-' + toast.type} style={{ pointerEvents: 'auto', cursor: options.tapToDismiss ? 'pointer' : 'default', marginBottom: 6, padding: '15px 15px 15px 50px', minWidth: 300, borderRadius: 3, color: '#fff', background: toast.type === 'success' ? '#51a351' : toast.type === 'info' ? '#2f96b4' : toast.type === 'warning' ? '#f89406' : '#bd362f' }}
              onClick={options.tapToDismiss ? function () { dismissToast(toast.id); } : undefined}>
              {options.closeButton && (
                <button type="button" className="toast-close-button" style={{ position: 'absolute', right: 4, top: 2, color: '#fff', background: 'none', border: 'none', fontSize: 20 }} onClick={function (e) { e.stopPropagation(); dismissToast(toast.id); }}>&times;</button>
              )}
              <div className="toast-title"><strong>{toast.title}</strong></div>
              <div className="toast-message">{toast.msg}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notifications;
