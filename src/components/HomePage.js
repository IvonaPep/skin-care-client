import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

function HomePage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel className="" controls={false} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="carousel-item">
          <img
            className="carousel-img d-block w-100 mx-auto"
            src={require("../images/silk.jpeg")}
            alt="First slide"
          />
          <Carousel.Caption className="mb-5">
            <h1 className="carousel-h1">SkincareHacks</h1>
            <p>
              Struggling with some skin issue? Find here some great advices and
              products to help your skin shine.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img
            className="carousel-img d-block w-100 mx-auto"
            src={require("../images/silk.jpeg")}
            alt="Second slide"
          />

          <Carousel.Caption className="mb-5">
            <h1 className="carousel-h1">SkincareHacks</h1>
            <p>
              You have skin-advices for others? Share your experiences and help
              others find their skincare-routine.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img
            className="carousel-img d-block w-100 mx-auto"
            src={require("../images/silk.jpeg")}
            alt="Third slide"
          />

          <Carousel.Caption className="mb-5">
            <h1 className="carousel-h1">SkincareHacks</h1>
            <p>Here to get inspiration and new Hacks? Let`s go!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container">
        <div className=" row justify-content-center m-5">
        <div className="card col-10 col-md-5 d-flex text-center shadow-lg p-3 m-3">
        <Link to={"/advices"}>
        <img src={require("../images/beauty22.jpeg")} class="card-img-top img-fluid max-width:100% height:auto" alt=""/>
        </Link>
          <Link className="link-to-home" to={"/advices"}><h2>Advices</h2></Link>
        </div>
        
        <div className="card col-10 col-md-5 d-flex text-center shadow-lg p-3 m-3">
        <Link to={"/products"}>
        <img src={require("../images/beauty15.jpeg")} class="card-img-top img-fluid max-width:100% height:auto" alt=""/>
        </Link>
          <Link className="link-to-home" to={"/products"}><h2 >Products</h2></Link>
        </div>
        </div>
        </div>
      </div>
  );
}
export default HomePage;
