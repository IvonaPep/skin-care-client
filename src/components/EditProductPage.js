import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Select from "react-select";

function EditProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brands, setBrands] = useState("");
  const [advices, setAdvices] = useState([]);
  const [chosenAdvices, setChosenAdvices] = useState([]);

  const { productId } = useParams();
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setBrands(response.data.brands)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [productId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    const requestBody = { title, description, brands, advices: chosenAdvices };

    // Make a PUT request to update the product
    axios
        .put(
            `${process.env.REACT_APP_API_URL}/products/${productId}`, 
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
            navigate(`/products/${productId}`)
        });
};
 
const deleteProduct = () => {         
  
  axios
    .delete(`${process.env.REACT_APP_API_URL}/products/${productId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then(() => {navigate('/products')
    })
    .catch((err) => console.log(err));
};  

return (
  <div className="row justify-content-center">
      <h3 className="m-3">Edit Product</h3>

      <form className="w-50 m-2" onSubmit={handleFormSubmit}>
      <div className="form-group my-3">
          <label>Title:</label>
          <input className="form-control my-3"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
</div>
<div className="form-group">
          <label>Description of Product:</label>
          <textarea className="form-control my-3"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />

</div>
<div className="form-group">
          <label>Brands:</label>
          <textarea className="form-control my-3"
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
          <button className="btn btn-light" type="submit">Update Product</button> <br/>
          <button className="btn btn-outline-danger btn-sm m-5" onClick={deleteProduct}>Delete Product</button>
      </form>
  </div>
);
}

export default EditProductPage;
