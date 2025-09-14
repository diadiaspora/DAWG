import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      <div
        className="desktopCarousel"
        style={{
          width: "100%",
          marginRight: "12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#1E3769",
            marginLeft: "0px",
            paddingLeft: "0px",
            width: "1012px",
            height: "200px",
            borderRadius: "7px",
            display: "flex",
            marginRight: "12px",
            marginLeft: "0px",
          }}
        >
          <div style={{ width: "253px" }}>
            <img
              src="/dogbeach 1.png"
              style={{ width: "100%" }}
              alt="dog logo with money eyes"
            />
          </div>
          <div style={{ width: "500px" }}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Share Your Experiences!
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Have you traveled with your pet?
            </p>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Make a Post
            </h2>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              You can help keep pets and their parents
              <br></br>safe and stress free while traveling
            </p>
          </div>
          <div style={{ width: "253px", alignContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    borderWidth: "0px",
                    width: "220px",
                    height: "44px",
                    color: "black",
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <p>Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "1012px" }}>
        <div
          style={{
            backgroundColor: "#1E3769",
            marginLeft: "0px",
            paddingLeft: "0px",
            width: "1012px",
            height: "200px",
            borderRadius: "7px",
            display: "flex",
            marginRight: "12px",
            marginLeft: "0px",
          }}
        >
          <div style={{ width: "253px" }}>
            <img
              src="/dogpool 1.png"
              style={{ width: "100%" }}
              alt="dog logo with money eyes"
            />
          </div>
          <div style={{ width: "500px" }}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Be Prepared for Pet Travel
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Get Everything You Need For Your Trip
            </p>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Shop Now
            </h2>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Browse a curated collection of the best products <br></br> for
              pets and their parents
            </p>
          </div>
          <div style={{ width: "253px", alignContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    borderWidth: "0px",
                    width: "220px",
                    height: "44px",
                    color: "black",
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <p>Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "1012px" }}>
        <div
          style={{
            backgroundColor: "#1E3769",
            marginLeft: "-15px",
            paddingLeft: "0px",
            width: "1012px",
            height: "200px",
            borderRadius: "7px",
            display: "flex",
            marginRight: "12px",
            marginLeft: "0px",
          }}
        >
          <div style={{ width: "253px" }}>
            <img
              src="/dogtravel 2.png"
              style={{ width: "100%" }}
              alt="dog logo with money eyes"
            />
          </div>
          <div style={{ width: "500px" }}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Get Ready and Get Going
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Store your trip details in one place
            </p>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Start Planning
            </h2>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              Keep accommodation, flight, and all travel plans in one place.
            </p>
          </div>
          <div style={{ width: "253px", alignContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    borderWidth: "0px",
                    width: "220px",
                    height: "44px",
                    color: "black",
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <p>Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Slider>
  );
};

export default HeaderCarousel;
