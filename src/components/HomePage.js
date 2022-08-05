import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Skincare Hacks</h1>
<div>
    Some div with explanation about the page...
</div>

      <div>
        <Link to={"/advices"}>Advices</Link>
      </div>
      <div>
        <Link to={"/products"}>Products</Link>
      </div>
    </div>
  );
}

export default HomePage;
