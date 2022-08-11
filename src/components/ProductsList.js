import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

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
    <div>
      <h1>List of Products</h1>
      <button className="btn btn-light my-4">
        <Link className="link" to={`/products/create`}>
          Add a new product
        </Link>
      </button>
      <div className="container">
        <div className="row justify-content-center">
          {products.map((product) => {
            return (
              <div className="card-deck col-10 col-md-6 lg-5 d-flex">
                <div className="card text-center shadow-lg p-4 m-4 w-100">
                  <div key={product._id} className="advices">
                    <div className="card-header">
                      <h3>{product.title}</h3>
                    </div>
                    <div className="card-body">
                      <Link
                        to={`/products/${product._id}`}
                        className="btn btn-light btn-sm"
                      >
                        See product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
