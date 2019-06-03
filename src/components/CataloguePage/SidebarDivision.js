import React from 'react';

import Separator from './Separator.js';

const SidebarDivision = ({ index, onToggleView, title, containerClass, children, opened }) => {
  const openerClass = opened ? 'opener-down' : 'opener-up';

  return (
    <div>
      <section className="sidebar__division">
        <div className={`sidebar__${containerClass}`}>
          <div className="sidebar__division-title">
            <h3>{title}</h3>
            <div
              className={openerClass}
              onClick={event => onToggleView(event, title)}
            ></div>
          </div>
          <div className={!opened ? 'sidebar-element-hidden' : null}>
            {children}
          </div>
        </div>
      </section>
      <Separator size="150" id={index} />
    </div>
  );
};

export default SidebarDivision;
