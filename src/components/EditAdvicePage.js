import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function EditAdvicePage() {
  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [advice, setAdvice] = useState("");

  const { adviceId } = useParams();
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  
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
   
    const requestBody = { title, problemDescription, advice };

    // Make a PUT request to update the project
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

          <button type="submit">Update Advice</button>
      </form>
      <button onClick={deleteAdvice}>Delete Advice</button>
  </div>
);
}

export default EditAdvicePage;
