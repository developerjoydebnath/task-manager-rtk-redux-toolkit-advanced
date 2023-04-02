import React from 'react';

const TeamMember = ({ teamMember }) => {
  const { id, name, avatar } = teamMember || {};
  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" alt="lws" />
      <p className="label">{name}</p>
    </div>
  );
};

export default TeamMember;
