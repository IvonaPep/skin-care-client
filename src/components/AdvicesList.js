import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';


function AdvicesList() {
  const [advices, setAdvices] = useState([]);

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



  return (
    <div >
      <h1>List of Advices</h1>
      <Link to={`/advices/create`}>
<button>Add your advice</button>
</Link>
      {advices.map((advice) => {
        return (
          <div key={advice._id} className="advices">
            <h2>{advice.title}</h2>
            <Link to={`/advices/${advice._id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
}

export default AdvicesList;
