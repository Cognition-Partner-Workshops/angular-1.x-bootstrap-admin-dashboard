/**
 * PopularApp — React port of the AngularJS popular-app directive (popularApp.html).
 *
 * Static "Most Popular App" widget. The app logo path is resolved from
 * layoutPaths (the React equivalent of the appImage filter).
 */
import React from 'react';

export function PopularApp({ layoutPaths }) {
  var logoSrc = layoutPaths.images.root + 'app/my-app-logo.png';

  return (
    <popular-app>
      <div className="popular-app-img-container">
        <div className="popular-app-img">
          <img src={logoSrc} />
          <span className="logo-text">Super&nbsp;App</span>
        </div>
      </div>
      <div className="popular-app-cost row">
        <div className="col-xs-9">
          Most Popular App
        </div>
        <div className="col-xs-3 text-right">
          175$
        </div>
      </div>
      <div className="popular-app-info row">
        <div className="col-xs-4 text-left">
          <div className="info-label">Total Visits</div>
          <div>47,512</div>
        </div>
        <div className="col-xs-4 text-center">
          <div className="info-label">New Visits</div>
          <div>9,217</div>
        </div>
        <div className="col-xs-4 text-right">
          <div className="info-label">Sales</div>
          <div>2,928</div>
        </div>
      </div>
    </popular-app>
  );
}
