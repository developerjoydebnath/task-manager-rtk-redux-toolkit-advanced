import React from 'react';
import { useGetTeamMembersQuery } from '../../../features/teamMembers/teamMembersApi';
import TeamMember from './TeamMember';

const TeamMembers = () => {
  const { data, isLoading, isError, error } = useGetTeamMembersQuery();

  const teamMembers = data?.data;

  let content;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <h1>some error here</h1>
      </div>
    );
  } else if (!isLoading && !isError && teamMembers?.length === 0) {
    content = <div>No team member found!</div>;
  } else if (!isLoading && !isError && teamMembers?.length > 0) {
    content = teamMembers.map((teamMember) => <TeamMember key={teamMember._id} teamMember={teamMember} />);
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;
