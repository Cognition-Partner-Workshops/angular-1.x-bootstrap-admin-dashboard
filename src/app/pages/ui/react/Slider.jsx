import React, { useState, useRef, useCallback, useEffect } from 'react';
import Panel from './Panel';

function RangeSlider({ min, max, from, to, step, prefix, postfix, hasGrid }) {
  var [value, setValue] = useState(from || min);

  return (
    <div className="slider-wrapper">
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={function (e) { setValue(parseInt(e.target.value, 10)); }}
        style={{ width: '100%' }}
      />
      <div className="slider-value">
        {prefix || ''}{value}{postfix || ''}
      </div>
    </div>
  );
}

function DoubleRangeSlider({ min, max, from, to, step, prefix, postfix }) {
  var [low, setLow] = useState(from || min);
  var [high, setHigh] = useState(to || max);

  return (
    <div className="slider-wrapper">
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={low}
          onChange={function (e) {
            var v = parseInt(e.target.value, 10);
            if (v <= high) setLow(v);
          }}
          style={{ flex: 1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={high}
          onChange={function (e) {
            var v = parseInt(e.target.value, 10);
            if (v >= low) setHigh(v);
          }}
          style={{ flex: 1 }}
        />
      </div>
      <div className="slider-value">
        {prefix || ''}{low}{postfix || ''} - {prefix || ''}{high}{postfix || ''}
      </div>
    </div>
  );
}

function Slider() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Ion Range Slider" panelClass="with-scroll slider-panel">
            <div className="control-label">Simple Start</div>
            <RangeSlider min={0} max={100} from={10} />
            <div className="control-label">Set Prefix</div>
            <RangeSlider min={0} max={1000} from={550} prefix="$" step={10} />
            <div className="control-label">Set Postfix</div>
            <RangeSlider min={0} max={100} from={30} postfix="%" />
            <div className="control-label">With Grid</div>
            <RangeSlider min={0} max={100} from={50} hasGrid />
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Double Sliders" panelClass="with-scroll slider-panel">
            <div className="control-label">Double</div>
            <DoubleRangeSlider min={0} max={100} from={10} to={80} />
            <div className="control-label">With Prefix</div>
            <DoubleRangeSlider min={0} max={1000} from={200} to={800} step={50} prefix="$" />
            <div className="control-label">With Postfix</div>
            <DoubleRangeSlider min={0} max={100} from={25} to={75} postfix="%" />
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Slider;
