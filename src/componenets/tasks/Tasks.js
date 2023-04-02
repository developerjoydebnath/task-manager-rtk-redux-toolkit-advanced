import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import Task from './Task';

const Tasks = () => {
  const { checked, search } = useSelector((state) => state.filters);
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  let content;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <h1>some error here</h1>
      </div>
    );
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = <div>No conversations found!</div>;
  } else if (!isLoading && !isError && tasks?.length > 0) {
    // const kkk = tasks.filter((task) => checked.find((obj) => obj.id === task.id));
    // console.log(kkk, 'kkk');

    return (content = tasks
      .filter((task) => task?.taskName.toLowerCase().includes(search.toLowerCase()))
      .filter((task) => (checked.length > 0 ? checked.includes(task.project.projectName) : true))
      .map((task) => <Task key={task.id} task={task} />));
  }

  return <div className="lws-task-list">{content}</div>;
};

export default Tasks;
