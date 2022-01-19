import React from "react";

import "./SignInAndSignOut.styles.scss";
import { SignInWithGoogle } from "./../../firebase/firebase.utils";

const SignInAndSignOut = () => {
  return (
    <div className='sign-in-and-sign-up' onClick={SignInWithGoogle}>
      Sign In
    </div>
  );
};

export default SignInAndSignOut;
