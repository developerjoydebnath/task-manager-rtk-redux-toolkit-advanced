import React from 'react';
import { useDispatch } from 'react-redux';
import { status } from '../../../features/filters/filtersSlice';

const Project = ({ project }) => {
  const { id, colorClass, projectName } = project;
  const dispatch = useDispatch();

  const handleProjectsStatus = () => {
    dispatch(status(projectName));
  };

  return (
    <div className="checkbox-container">
      <input type="checkbox" className={colorClass} onChange={handleProjectsStatus} />
      <p className="label">{projectName}</p>
    </div>
  );
};

export default Project;
