import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

    return (
      <div className="">
        <nav className="navbar fixed-top navbar-light bg-light">
          <NavLink className="navbar-brand mx-2" to="/">Home </NavLink>
          <NavLink className="navbar-brand mx-2" to="/advices">Advices</NavLink>
          <NavLink className="navbar-brand mx-2" to="/products">Products</NavLink>


          {isLoggedIn && (
                <>
                    <span className="mx-2 ms-auto"> {user && user.username}</span> 
                    <button className="navbar-brand me-3 ms-auto" onClick={logOutUser}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink className="navbar-brand mx-2 ms-auto" to="/signup">Sign Up</NavLink>
                    <NavLink className="navbar-brand mx-2 me-3" to="/login">Login</NavLink>
                </>
            )}

        </nav>
        
      </div>
    );
  }

  export default Navbar;