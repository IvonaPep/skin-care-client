import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const getOneProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  return (
    <div className="row justify-content-center">
      {product && (
        <>
          <h1 className="my-4">{product.title}</h1>
          <p className="advice-text w-50">{product.description}</p>
          <h4>This Brands of "{product.title}" I can recommend:</h4>
          <p className="advice-text w-50">{product?.brands}</p>
        </>
      )}
      <br />
      <p className="link-to w-50">Look also here for more tips:</p>
      {product &&
        product.advices.map((advice) => (
          <li key={advice._id}>
            <Link className="link-deco" to={`/advices/${advice._id}`}>
              <p>{advice.title}</p>
            </Link>
          </li>
        ))}
      <Link to={`/products/edit/${productId}`}>
        <button className="btn btn-light btn-sm">Edit</button>
      </Link>
      <Link to="/products">
        <button className="btn btn-light btn-sm mb-5 mt-2">
          Back to products
        </button>
      </Link>
    </div>
  );
}

export default ProductDetails;
