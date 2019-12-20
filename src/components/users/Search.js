import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.object.isRequired,
    clearUsers: PropTypes.object.isRequired,
    showClear: PropTypes.bool.isRequired
  };
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    if (!text) {
      this.props.setAlert('Please enter something', 'light');
      return;
    }
    this.props.searchUsers(this.state.text);
  };

  render() {
    const { text, errorMsg } = this.state;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.handleChange}
            placeholder="Search users..."
          />

          <input type="submit" value="search" class="btn btn-dark btn-block" />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
