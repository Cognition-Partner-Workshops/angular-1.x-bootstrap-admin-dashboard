import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function Slider(props) {
  var inputRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn.ionRangeSlider) return;
    $(inputRef.current).ionRangeSlider(props.options);
    return function () {
      var slider = $(inputRef.current).data('ionRangeSlider');
      if (slider) slider.destroy();
    };
  }, []);

  return React.createElement('div', { className: 'slider-box' },
    React.createElement('h5', null, props.heading),
    React.createElement('input', { ref: inputRef, type: 'text' })
  );
}

export function SliderPage() {
  var sliders = [
    { heading: 'Basic', options: { min: 100, max: 1000, from: 550 } },
    { heading: 'With prefix', options: { type: 'double', grid: true, min: 0, max: 1000, from: 200, to: 800, prefix: '$' } },
    { heading: 'With postfix', options: { type: 'single', grid: true, min: -90, max: 90, from: 0, postfix: '\u00b0' } },
    { heading: 'Two way range', options: { type: 'double', grid: true, min: -1000, max: 1000, from: -500, to: 500 } },
    { heading: 'With Steps', options: { type: 'double', grid: true, min: 0, max: 10000, from: 3000, to: 7000, step: 250 } },
    { heading: 'Decorating numbers', options: { type: 'single', grid: true, min: 0, max: 10000, from: 5000, prettify_enabled: true, prettify_separator: ',' } },
    { heading: 'Using custom values array', options: { grid: true, from: 3, values: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] } },
    { heading: 'Disabled', options: { min: 0, max: 100, from: 30, disable: true } }
  ];

  return React.createElement(Panel, { panelClass: 'with-scroll' },
    sliders.map(function (s, i) {
      return React.createElement(Slider, { key: i, heading: s.heading, options: s.options });
    })
  );
}
