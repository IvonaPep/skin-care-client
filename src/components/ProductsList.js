import { Link } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(products);
  const [searchInput, setSearchInput] = useState("");

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

  const searchElements = (str) => {
    setSearchInput(str)
    const filtered = products.filter((product) =>
      product.title.trim()
        .toLowerCase()
        .includes(str.trim().toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div>
      <h1>List of Products</h1>
      <SearchBar searchElements={searchElements} />
      <button className="btn btn-light my-4">
        <Link className="link" to={`/products/create`}>
          Add a new product
        </Link>
      </button>
      <div className="container">
        <div className="row justify-content-center">
          {(searchResults.length === 0 && !searchInput)
            ? products.map((product) => {
              return(
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
             ) })
            : searchResults.map((product) => 
           {  return (
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
              )}
              )}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
