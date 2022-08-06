import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

    return (
      <div className="">
        <nav>
          <NavLink to="/">Home |</NavLink>
          <NavLink to="/advices">Advices |</NavLink>
          <NavLink to="/products">Products |</NavLink>


          {isLoggedIn && (
                <>
                    <span> Hi, {user && user.username}</span> 
                    <button onClick={logOutUser}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/signup">Sign Up</NavLink> | 
                    <NavLink to="/login">Login</NavLink>
                </>
            )}

        </nav>
        
      </div>
    );
  }

  export default Navbar;