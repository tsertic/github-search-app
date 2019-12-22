import React, { useContext } from 'react';
import useInput from './../../hooks/useInput';
import GithubContext from './../../context/github/githubContext';
const Search = () => {
  const githubContext = useContext(GithubContext);
  const { searchUsers, showClear, clearUsers, setAlert } = githubContext;
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

export default Search;
