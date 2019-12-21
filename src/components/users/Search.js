import React from 'react';
import PropTypes from 'prop-types';
import useInput from './../../hooks/useInput';
const Search = ({ showClear, searchUsers, clearUsers, setAlert }) => {
  const [text, handleTextChange, resetText] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) {
      setAlert('Please enter something', 'light');
      return;
    }
    searchUsers(text);
    resetText();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Search users..."
        />

        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;
