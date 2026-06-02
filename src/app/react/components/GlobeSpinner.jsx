/**
 * <GlobeSpinner> — a spinning globe loading overlay, scoped to the maps module.
 *
 * Renders an absolutely-positioned overlay (covers its relatively-positioned
 * parent) with a rotating ion-earth globe icon while a map is initializing.
 * Hidden once `visible` is false so it never occludes the loaded map.
 */
import React from 'react';

var SPIN_KEYFRAMES =
  '@keyframes ba-globe-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';

export function GlobeSpinner({ visible }) {
  if (!visible) return null;

  return React.createElement('div', {
    className: 'maps-globe-spinner',
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.85)',
      zIndex: 1000,
    },
  },
    React.createElement('style', null, SPIN_KEYFRAMES),
    React.createElement('i', {
      className: 'ion-earth',
      style: {
        fontSize: '56px',
        color: '#209e91',
        display: 'inline-block',
        animation: 'ba-globe-spin 1.4s linear infinite',
      },
    }),
    React.createElement('span', {
      style: { marginTop: '12px', color: '#666', fontSize: '14px' },
    }, 'Loading map\u2026')
  );
}
