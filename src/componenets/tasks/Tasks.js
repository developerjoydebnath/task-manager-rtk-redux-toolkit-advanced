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
    content = <div>No Task Found!</div>;
  } else if (!isLoading && !isError && tasks?.length > 0) {
    // const kkk = tasks.filter((task) => checked.find((obj) => obj.id === task.id));
    // console.log(kkk, 'kkk');

    return (content = (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '10px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px',
            paddingRight: '30px',
          }}
        >
          <span>Deadline</span>

          <span>Task Name</span>

          <span>Assigned to | Action | Status</span>
        </div>
        {tasks
          .filter((task) => task?.taskName.toLowerCase().includes(search.toLowerCase()))
          .filter((task) => (checked.length > 0 ? checked.includes(task.project.projectName) : true))
          .map((task, inx) => (
            <Task key={inx} task={task} />
          ))}
      </div>
    ));
  }

  return (
    <div className="lws-task-list">
      <div>{content}</div>
    </div>
  );
};

export default Tasks;
