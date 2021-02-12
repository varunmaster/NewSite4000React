import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const GlobalNav = () => {

  return (
    <div className="bg-dark text-center nav justify-content-center">
      <Nav pills>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/listMovies">Movies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/listShows">Shows</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default GlobalNav;
