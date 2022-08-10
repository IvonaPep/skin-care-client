import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

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
    .then(() => {
      navigate("/products");
    })
    .catch((err) => console.log(err));
};  

return (
  <div>
      <h3>Edit Product</h3>

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
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
          <label>Brands:</label>
          <textarea
              name="brands"
              value={brands}
              onChange={(e) => setBrands(e.target.value)}
          />
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
          <button type="submit">Update Product</button>
      </form>
      <button onClick={deleteProduct}>Delete Product</button>
  </div>
);
}

export default EditProductPage;
