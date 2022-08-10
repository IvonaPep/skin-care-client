import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";


function CreateAdvicePage() {
  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [advice, setAdvice] = useState("");
  const [products, setProducts] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
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


  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");

    const requestBody = { title, problemDescription, advice, products: chosenProducts };


    axios
      .post(`${process.env.REACT_APP_API_URL}/advices/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {

        setTitle("");
        setProblemDescription("");
        setAdvice("");

        navigate(`/advices`);
      })
      .catch((error) => {
        setErrorMsg("there was an error creating a new advice");
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Add your Advice:</h3>
<br/>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
<br/>
        <label>Description of Skin-Issue:</label>
        <textarea
          name="problemDescription"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
<br/>
        <label>Advice to solve Skin-Issue:</label>
        <textarea
          name="advice"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        />
<br/>

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
        <button type="submit">Create Advice</button>
      </form>
    </div>
  );
}

export default CreateAdvicePage;
