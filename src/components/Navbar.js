import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
      <div className="">
        <nav>
          <NavLink to="/">Home |</NavLink>
          <NavLink to="/advices">Advices |</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
        
      </div>
    );
  }

  export default Navbar;