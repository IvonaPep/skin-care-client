import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Select from "react-select";

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

    const requestBody = {
      title,
      problemDescription,
      advice,
      products: chosenProducts,
    };
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
    <div className="row justify-content-center">
      <h3 className="m-3">Add your Advice:</h3>

      <form className="w-50 m-2" onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label>Title:</label>
          <input
            required
            className="form-control my-3"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description of Skin-Issue:</label>
          <textarea
            required
            className="form-control my-3"
            name="problemDescription"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Advice to solve Skin-Issue:</label>
          <textarea
            required
            className="form-control my-3"
            name="advice"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Select products related:
            <Select className="form-control my-3"
              closeMenuOnSelect={false}
              options={products.map((product) => ({
                label: product.title,
                value: product._id
              }))}
              isMulti
              onChange={(e) => {
                setChosenProducts(
                  e.map((element) => {
                    return element.value;
                  })
                );
              }}
            />
          </label>
        </div>

        <button className="btn btn-light my-4" type="submit">
          Create Advice
        </button>
      </form>
    </div>
  );
}

export default CreateAdvicePage;
