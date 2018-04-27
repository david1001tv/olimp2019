import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isAuthenticated, logOut } from '~api';

class Menu extends Component {
  static propTypes = {
    onLogOut: PropTypes.func.isRequired
  };

  async handleLogOut() {
    await logOut();
    this.forceUpdate();
    this.props.onLogOut();
  }

  render() {
    return (
      <div>
        <div>
          {
            !isAuthenticated()
              ?
                <div>
                  <Link to="/auth/login">Log in</Link>
                </div>
              :
              null
          }
          {
            isAuthenticated()
              ?
                <div>
                  <button onClick={async () => this.handleLogOut()}>Log out</button>
                </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}

export default Menu;
