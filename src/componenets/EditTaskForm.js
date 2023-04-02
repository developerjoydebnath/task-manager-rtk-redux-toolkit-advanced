import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import { useEditTaskMutation, useGetTaskQuery } from '../features/tasks/tasksApi';
import { useGetTeamMembersQuery } from '../features/teamMembers/teamMembersApi';

const EditTaskForm = () => {
  const { taskId: id } = useParams();
  const { data: projects, isLoading: isProjectLoading, isError: isProjectError } = useGetProjectsQuery();
  const { data: teamMembers, isLoading, isError } = useGetTeamMembersQuery();
  const { data: task, isLoading: isTaskLoading, isError: isTaskError } = useGetTaskQuery(id);
  const [editTask, { data: editedTask }] = useEditTaskMutation();
  const [taskName, setTaskName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [projectName, setProjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (task?.id) {
      setTaskName(task.taskName);
      setTeamMember(task.teamMember.name);
      setProjectName(task.project.projectName);
      setDeadline(task.deadline);
    }
  }, [task]);

  const handleSelectChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSetTeamMember = (e) => {
    setTeamMember(e.target.value);
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    const updatedData = {
      taskName,
      teamMember: teamMembers.find((member) => member.name === teamMember),
      project: projects.find((member) => member.projectName === projectName),
      deadline,
      status: task?.status,
    };

    // console.log(updatedData);

    editTask({
      id,
      updatedData,
    });
    navigate('/');
  };

  // decide what to render
  let content;

  if (isLoading || isProjectLoading) {
    content = <div className="m-2 text-center">Loading...</div>;
  } else if ((!isLoading && isError) || (!isProjectLoading && isProjectError)) {
    content = (
      <div>
        <h1>some error here</h1>
      </div>
    );
  } else if (
    (!isLoading && !isError && teamMembers?.length === 0) ||
    (!isProjectLoading && !isProjectError && projects?.length === 0)
  ) {
    content = <div>No conversations found!</div>;
  } else if (
    (!isLoading && !isError && teamMembers?.length > 0) ||
    (!isProjectLoading && !isProjectError && projects?.length > 0)
  ) {
    content = (
      <form className="space-y-6" onSubmit={handleEditTask}>
        <div className="fieldContainer">
          <label htmlFor="lws-taskName">Task Name</label>
          <input
            type="text"
            name="taskName"
            id="lws-taskName"
            required
            placeholder="Implement RTK Query"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="fieldContainer">
          <label>Assign To</label>
          <select name="teamMember" id="lws-teamMember" required value={teamMember} onChange={handleSetTeamMember}>
            <option value="" hidden selected>
              Select Team Member
            </option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-projectName">Project Name</label>
          <select id="lws-projectName" name="projectName" required onChange={handleSelectChange} value={projectName}>
            <option value="" hidden selected>
              Select Project
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            id="lws-deadline"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="lws-submit" disabled={isTaskLoading}>
            Save
          </button>
        </div>
      </form>
    );
  }

  return <div>{content}</div>;
};

export default EditTaskForm;
