import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function EditAdvicePage() {
  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [advice, setAdvice] = useState("");
  const [products, setProducts] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([]);

  const { adviceId } = useParams();
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

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
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/advices/${adviceId}`)
      .then((response) => {
        setTitle(response.data.title);
        setProblemDescription(response.data.problemDescription);
        setAdvice(response.data.advice);

      })
      .catch((e) => {
        console.log(e);
      });
  }, [adviceId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    const requestBody = { title, problemDescription, advice, products: chosenProducts };

    // Make a PUT request to update the advice
    axios
        .put(
            `${process.env.REACT_APP_API_URL}/advices/${adviceId}`, 
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
            navigate(`/advices/${adviceId}`)
        });
};
 
const deleteAdvice = () => {         
  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/advices/${adviceId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then(() => {
      navigate("/advices");
    })
    .catch((err) => console.log(err));
};  

return (
  <div>
      <h3>Edit Advice</h3>

      <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description of Skin-Issue:</label>
          <textarea
              name="problemDescription"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
          />

<label>Advice to solve Skin-Issue:</label>
          <textarea
              name="advice"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
          />

<label>
          Select products related:
          <br /> 
          <select
            multiple={true}
            value={chosenProducts}
            onChange={(e) => {
              setChosenProducts([...chosenProducts, e.target.value]);
            }}
          >
            {products.map((product) => {
              return (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              );
            })}
          </select>
        </label> 
          <button type="submit">Update Advice</button>
      </form>
      <button onClick={deleteAdvice}>Delete Advice</button>
  </div>
);
}

export default EditAdvicePage;
