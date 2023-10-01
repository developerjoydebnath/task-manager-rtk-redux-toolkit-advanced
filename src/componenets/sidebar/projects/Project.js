import React from 'react';
import { useDispatch } from 'react-redux';
import { status } from '../../../features/filters/filtersSlice';

const Project = ({ project }) => {
  const { _id, colorClass, projectName } = project;
  const dispatch = useDispatch();

  const handleProjectsStatus = () => {
    dispatch(status(projectName));
  };

  return (
    <div className="checkbox-container">
      <input type="checkbox" id={projectName} className={colorClass} onChange={handleProjectsStatus} />
      <label htmlFor={projectName} className="label">
        {projectName}
      </label>
    </div>
  );
};

export default Project;
