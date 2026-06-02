/**
 * <GlobeLoader> — a spinning-globe loading overlay used by the maps module.
 *
 * Rendered as an absolutely-positioned overlay inside a (position: relative)
 * wrapper around a map container. It shows a rotating globe while the
 * third-party map library initializes, and is unmounted once the map is ready.
 *
 * This is intentionally scoped to the maps React pages only (per request to
 * make the loading spinner a globe just for the maps module).
 *
 * The globe rotates on its Y axis via a self-injected `ba-globe-spin` keyframe
 * so it does not depend on the global app stylesheet.
 */
import React from 'react';

var KEYFRAME_ID = 'ba-globe-spin-keyframes';

function ensureKeyframes() {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.getElementById(KEYFRAME_ID)) {
    return;
  }
  var style = document.createElement('style');
  style.id = KEYFRAME_ID;
  style.textContent =
    '@keyframes ba-globe-spin{from{transform:rotateY(0deg);}to{transform:rotateY(360deg);}}';
  document.head.appendChild(style);
}

export function GlobeLoader({ label }) {
  ensureKeyframes();

  var overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1000
  };

  var globeStyle = {
    fontSize: '64px',
    lineHeight: '1',
    display: 'inline-block',
    animation: 'ba-globe-spin 1.6s linear infinite',
    // keep the rotation readable in 3D
    transformStyle: 'preserve-3d'
  };

  var labelStyle = {
    marginTop: '16px',
    color: '#ffffff',
    fontSize: '14px',
    letterSpacing: '0.5px'
  };

  return React.createElement(
    'div',
    { className: 'maps-globe-loader', style: overlayStyle, role: 'status', 'aria-live': 'polite' },
    React.createElement('span', { style: globeStyle, role: 'img', 'aria-label': 'globe' }, '\uD83C\uDF10'),
    React.createElement('div', { style: labelStyle }, label || 'Loading map\u2026')
  );
}
