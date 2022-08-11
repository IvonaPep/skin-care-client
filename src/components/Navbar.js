import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { FaCrown } from 'react-icons/fa';

function Navbar() {


  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

    return (
  
        <nav className="navbar fixed-top">
          <NavLink className="navbar-brand mx-4" to="/">Home </NavLink>
          <NavLink className="navbar-brand mx-2" to="/advices">Advices</NavLink>
          <NavLink className="navbar-brand mx-2" to="/products">Products</NavLink>


          {isLoggedIn && (
                <>
                    <span className="username ms-auto">
                        {user && user.username} <FaCrown className="mb-2 me-1"/></span> 

                         
                        <div className="navbar-brand ms-5 pe-5"></div>
                    <button className="navbar-brand me-4 ms-auto" onClick={logOutUser}>Logout</button>
                    
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink className="navbar-brand mx-2 ms-auto" to="/signup">Sign Up</NavLink>
                    <NavLink className="navbar-brand mx-2 me-3 pe-4" to="/login">Login</NavLink>
                </>
            )}

        </nav>
        
    );
  }

  export default Navbar;