import React, { FC } from 'react';
import './index.css';

export const NavMenu:FC = () => {
  return (
      <ul className="nav-menu">
          <li className="nav-item">
              <a href="/">Home</a>
          </li>
          <li className="nav-item">
              <a href="/blog">Blog</a>
          </li>
          <li className="nav-item">
              <a href="/tool">Tool</a>
          </li>
          <li className="nav-item">
              <a href="/game">Game</a>
          </li>
      </ul>
  );
};
