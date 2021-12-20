import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="Header">
        {title}
      </div>
    )
  }
}

export default Header;
