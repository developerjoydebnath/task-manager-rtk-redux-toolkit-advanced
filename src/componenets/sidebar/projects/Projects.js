import React from 'react';
import { useGetProjectsQuery } from '../../../features/projects/projectsApi';
import Project from './Project';

const Projects = () => {
  const { data, isError, isLoading, error } = useGetProjectsQuery();

  const projects = data?.data;

  let content;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <h1>some error here</h1>
      </div>
    );
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <div>No conversations found!</div>;
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => <Project key={project._id} project={project} />);
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default Projects;
