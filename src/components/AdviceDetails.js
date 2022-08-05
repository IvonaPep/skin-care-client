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
    <div>
      {advice && (
        <>
          <h1>{advice.title}</h1>
          <p>{advice.problemDescription}</p>
          <p>{advice.advice}</p>
        </>
      )}
      {advice &&
        advice.products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
            <h3>{product.title}</h3>
            </Link>

           
          </li>
        ))}
      <Link to={`/advices/edit/${adviceId}`}>
        <button>Edit</button>
      </Link>
      &nbsp;
      <Link to="/advices">
        <button>Back to advices</button>
      </Link>
    </div>
  );
}

export default AdviceDetails;
