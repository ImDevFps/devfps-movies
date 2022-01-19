import React from 'react';
import SignInAndSignOut from './../../components/sign-in-and-sign-out/SignInAndSignOut';
import './HomePage.styles.scss';

const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='background-wrapper'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/a1a5d7dc-aedf-4570-b58d-693af16e1445/7102c058-12ad-484e-8f31-9d1dda919946/NL-en-20211020-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt=''
        />
      </div>
      <div className='log-in'>
        <SignInAndSignOut />
      </div>
    </div>
  );
};

export default HomePage;
