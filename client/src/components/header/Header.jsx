import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import React from "react";
import "./Header.scss";
import { selecCurrentUser } from "./../../redux/user/user.selector";
import { auth } from "./../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  return (
    <div className='header'>
      <div className='category-bar'>
        <ul>
          <li>
            <Link to='/browse'>DevFps Movies</Link>
          </li>
          <li>
            <Link to='/browse'>خانه</Link>
          </li>
          <li>
            <Link to='/serials'>سریال</Link>
          </li>
          <li>
            <Link to='/films'>فیلم</Link>
          </li>
          <li>
            <Link to='/animes'>انیمه</Link>
          </li>
        </ul>
      </div>
      <div className='search-bar'>
        <ul>
          <li>
            <SearchIcon />
          </li>
          <li>
            {currentUser ? (
              <div onClick={() => auth.signOut()}>
                {currentUser.displayName}
              </div>
            ) : (
              <Link to='/'>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selecCurrentUser,
});

export default connect(mapStateToProps)(Header);
