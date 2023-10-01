import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from '../../features/filters/filtersSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(search(e.target.value));
  };
  return (
    <nav
      className="container relative py-3"
      style={{ position: 'sticky', top: 0, left: 0, zIndex: 100, backgroundColor: 'white' }}
    >
      <div className="flex items-center justify-between">
        <Link style={{ fontSize: '28px', fontWeight: '700' }} to="/">
          Task Manager
        </Link>
        <form className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={handleSubmit}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
