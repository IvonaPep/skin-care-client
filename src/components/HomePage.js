import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";


function HomePage() {
  
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex (selectedIndex);
  };

  return (
  

<Carousel className="" interval={null} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-80 mx-auto"
          // src={require("../images/beauty2.jpeg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-80 mx-auto"
          // src={require("../images/beauty15.jpeg")}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-80 mx-auto"
          // src={require("../images/beauty12.webp")}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
// </div>







//       <h1>Skincare Hacks</h1>
// <div>
//     Some div with explanation about the page...
// </div>

//       <div>
//         <Link to={"/advices"}>Advices</Link>
//       </div>
//       <div>
//         <Link to={"/products"}>Products</Link>
//       </div>
//     </div>
  );
}

export default HomePage;
