import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function CreateAdvicePage(props) {
  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [advice, setAdvice] = useState("");
  const [advices, setAdvices] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
      e.preventDefault();

      setErrorMsg("");

      const requestBody = { title, problemDescription, advice };

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

    axios
      .post(`${process.env.REACT_APP_API_URL}/advices`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }} )
      .then((response) => {

        fetchAdvices();

        setTitle("");
        setProblemDescription("");
        setAdvice("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new project");
        console.log(error)
      });
  };

 
return (
  <div>
      <h3>Add your Advice:</h3>

      <form onSubmit={handleSubmit}>
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

          <button type="submit">Create Advice</button>
      </form>
  </div>
);
}

export default CreateAdvicePage;
