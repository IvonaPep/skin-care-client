import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";


function AdviceDetails() {
  const [advice, setAdvice] = useState(null);

  const { adviceId } = useParams();

  const getOneAdvice = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/advices/${adviceId}`)
      .then((response) => {
        setAdvice(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOneAdvice();
  }, []);

  return (
 
    <div className="row justify-content-center">
      {advice && (
        <>
          <h1 className="mt-5">{advice.title}</h1>
          <p className="advice-subheader w-50">{advice.problemDescription}</p>
          <p className="advice-text w-50">{advice.advice}</p>
        </>
      )}
      <p className="link-to w-50">This products can help:</p>
      {advice &&
        advice.products.map((product) => (
          <li key={product._id}>
            <Link className="link-deco" to={`/products/${product._id}`}>
            <p>{product.title}</p>
            </Link>
          </li>
        ))}
      <Link to={`/advices/edit/${adviceId}`}>
        <button className="btn btn-light btn-sm">Edit</button>
      </Link>
      <Link to="/advices">
        <button className="btn btn-light btn-sm mb-5 mt-2">Back to advices</button>
      </Link>
    </div>
  );
}

export default AdviceDetails;
