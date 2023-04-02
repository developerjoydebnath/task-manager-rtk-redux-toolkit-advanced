import React from 'react';
import AddTaskBtn from '../componenets/AddTaskBtn';
import Sidebar from '../componenets/sidebar/Sidebar';
import Tasks from '../componenets/tasks/Tasks';

const Home = () => {
  return (
    <div className="text-[#111827]">
      <div className="container relative">
        <Sidebar />
        <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
          <div className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <AddTaskBtn />
            <Tasks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
