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
    <div>
       {console.log(product)}
      {product && (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product?.brands}</p>
        </>
      )}
     
      {product &&
   
        product.advices.map((advice) => (
          <li key={advice._id}>
            <Link to={`/advices/${advice._id}`}>
            <h3>{advice.title}</h3>
            </Link>

           
          </li>
        ))}
      <Link to={`/products/edit/${productId}`}>
        <button>Edit</button>
      </Link>
      &nbsp;
      <Link to="/products">
        <button>Back to products</button>
      </Link>
    </div>
  );
}

export default ProductDetails;
