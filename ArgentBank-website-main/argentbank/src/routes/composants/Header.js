import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../img/argentBankLogo.png';

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const usernameFromStore = useSelector((state) => state?.username || '');
  const [username, setUsername] = useState(usernameFromStore);

  useEffect(() => {
    if (user.userName !== username) {
      setUsername(user.userName);
    }
  }, [user.userName]);

  const handleSignOut = () => {
    dispatch({ type: 'signOut'});
  };

  return (
    <nav className="main-nav">
      <a href="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <div>
            <a className="main-nav-item" href="/user">
              <i className="fa fa-user-circle"></i>
              {username}
            </a>
            <a className="main-nav-item" href="/sign-in" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
            <a href="/sign-in" className="main-nav-item">
                <i className="fa fa-user-circle"></i> Sign In
            </a>
        )}
      </div>
    </nav>
  );
};

export default Header;
