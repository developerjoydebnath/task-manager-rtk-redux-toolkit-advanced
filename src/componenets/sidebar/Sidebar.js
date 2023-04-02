import React from 'react';
import Projects from './projects/Projects';
import TeamMembers from './teamMembers/TeamMembers';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Projects />
      <TeamMembers />
    </div>
  );
};

export default Sidebar;
