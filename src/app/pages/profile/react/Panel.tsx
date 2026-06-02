import React, { ReactNode, useEffect, useRef } from 'react';

interface PanelProps {
  panelClass?: string;
  children: ReactNode;
}

function Panel({ panelClass, children }: PanelProps) {
  var panelRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (panelRef.current) {
        panelRef.current.classList.remove('full-invisible');
        panelRef.current.classList.add('animated', 'zoomIn');
      }
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <div ref={panelRef} className={'panel full-invisible ' + (panelClass || '')}>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
