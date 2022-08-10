import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brands, setBrands] = useState("");
  const [advices, setAdvices] = useState([]);
  const [chosenAdvices, setChosenAdvices] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchAdvices();
  }, []);

  const fetchAdvices = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/advices`)
      .then((response) => {
        setAdvices(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");

    const requestBody = { title, description, brands, advices: chosenAdvices };

    axios
      .post(`${process.env.REACT_APP_API_URL}/products/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
   
        setTitle("");
        setDescription("");
        setBrands("");
       
        navigate(`/products`);
      })
      .catch((error) => {
        setErrorMsg("there was an error creating a new product");
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Add your Product:</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Description of the Product:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Brands:</label>
        <textarea
          type="text"
          name="brands"
          value={brands}
          onChange={(e) => setBrands(e.target.value)}
        />
        <br />
        <label>
          Select advices related:
          <br />
          <select
            multiple={true}
            value={chosenAdvices}
            onChange={(e) => {
              setChosenAdvices([...chosenAdvices, e.target.value]);
            }}
          >
            {advices.map((advice) => {
              return (
                <option key={advice._id} value={advice._id}>
                  {advice.title}
                </option>
              );
            })}
          </select>
        </label>

        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;
