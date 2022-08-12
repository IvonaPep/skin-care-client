import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Select from "react-select";


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

    const requestBody = {
      title,
      problemDescription,
      advice,
      products: chosenProducts,
    };

    // Make a PUT request to update the advice
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/advices/${adviceId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/advices/${adviceId}`);
      });
  };

  const deleteAdvice = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/advices/${adviceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(() => {navigate('/advices')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row justify-content-center">
      <h3 className="m-3">Edit Advice</h3>

      <form className="w-50 m-2" onSubmit={handleFormSubmit}>
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
        <button className="btn btn-light" type="submit">
          Update Advice
        </button>{" "}
        <br />
        <button
          className="btn btn-outline-danger btn-sm m-5"
          onClick={deleteAdvice}
        >
          Delete Advice
        </button>
      </form>
    </div>
  );
}

export default EditAdvicePage;
