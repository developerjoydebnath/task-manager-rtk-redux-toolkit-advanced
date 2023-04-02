import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../features/filters/filtersSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchText));
  };
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <a href="./index.html">
          <img src="/images/logo.svg" alt="lws" />
        </a>
        <form className="flex-1 max-w-xs search-field group" onSubmit={handleSubmit}>
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
