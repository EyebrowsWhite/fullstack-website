import React, { FC } from 'react';
import './index.css';
import {NavLink} from "react-router-dom";

export const NavMenu:FC = () => {
    const activeClassName = 'active-menu';
  return (
      <ul className="nav-menu">
          <li className="nav-item">
              <NavLink to="/" className={({ isActive }) =>
                  isActive ? activeClassName : ''
              }>Home</NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/blog" className={({ isActive }) =>
                  isActive ? activeClassName : ''
              }>Blog</NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/tool" className={({ isActive }) =>
                  isActive ? activeClassName : ''
              }>Tool</NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/game" className={({ isActive }) =>
                  isActive ? activeClassName : ''
              }>Game</NavLink>
          </li>
      </ul>
  );
};
