import React from 'react';
import EditTaskForm from '../componenets/EditTaskForm';

const Edit = () => {
  return (
    <div className="container relative">
      <div className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">Create Task for Your Team</h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <EditTaskForm />
        </div>
      </div>
    </div>
  );
};

export default Edit;
