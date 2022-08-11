import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

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
    <div className="row justify-content-center">
      <h3 className="m-3">Add your Product:</h3>

      <form className="w-50 m-2" onSubmit={handleSubmit}>
      <div className="form-group my-3">
        <label>Title:</label>
        <input required className="form-control my-3"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Description of the Product:</label>
        <textarea required className="form-control my-3"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Brands:</label>
        <textarea required className="form-control my-3"
          type="text"
          name="brands"
          value={brands}
          onChange={(e) => setBrands(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>
          Select advices related:
          <Select className="form-control my-3"
              closeMenuOnSelect={false}
              options={advices.map((advice) => ({
                label: advice.title,
                value: advice._id
              }))}
              isMulti
              onChange={(e) => {
                setChosenAdvices(
                  e.map((element) => {
                    return element.value;
                  })
                );
              }}
            />
        </label>
        </div>
        <button className="btn btn-light my-4" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;
