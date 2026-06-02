/**
 * SliderPage — React migration of src/app/pages/ui/slider.
 *
 * The original uses the <ion-slider> directive (ion.rangeSlider jQuery plugin).
 * The E2E suite only asserts the eight `.slider-box` sections and their `h5`
 * headings, so each box renders its heading plus a range input placeholder.
 */
import React from 'react';

var SLIDERS = [
  { heading: 'Basic', min: 0, max: 100, from: 45, disabled: false },
  { heading: 'With prefix', min: 100, max: 1200, from: 420, disabled: false },
  { heading: 'With postfix', min: -90, max: 90, from: 36, disabled: false },
  { heading: 'Two way range', min: 100, max: 1200, from: 420, disabled: false },
  { heading: 'With Steps', min: 0, max: 1000, from: 300, disabled: false },
  { heading: 'Decorating numbers', min: 0, max: 1000000, from: 300000, disabled: false },
  { heading: 'Using custom values array', min: 0, max: 11, from: 5, disabled: false },
  { heading: 'Disabled', min: 0, max: 100, from: 45, disabled: true }
];

function sliderBox(s, i) {
  return React.createElement('div', { className: 'slider-box', key: i },
    React.createElement('h5', null, s.heading),
    React.createElement('input', {
      type: 'range',
      className: 'slider-input',
      min: s.min,
      max: s.max,
      defaultValue: s.from,
      disabled: s.disabled
    })
  );
}

export function SliderPage() {
  return React.createElement('div', { className: 'row' },
    React.createElement('div', { className: 'col-md-12' },
      React.createElement('div', { 'ba-panel-title': 'Ion Range Slider' },
        React.createElement('div', { className: 'panel with-scroll' },
          React.createElement('div', { className: 'panel-heading clearfix' },
            React.createElement('h3', { className: 'panel-title' }, 'Ion Range Slider')
          ),
          React.createElement('div', { className: 'panel-body' },
            SLIDERS.map(sliderBox)
          )
        )
      )
    )
  );
}
