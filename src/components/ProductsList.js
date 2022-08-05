import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/products`)
      .then((response) => {
        setProducts(response.data);

      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <div >
      <h1>List of Products</h1>
      {products.map((product) => {
        return (
          <div key={product._id} className="products">
            <h2>{product.title}</h2>
            {/* <img src={apartment.img} /> <br /> */}
            <Link to={`/products/${product._id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
