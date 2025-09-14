import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div>
        <div
          style={{
            backgroundImage: "url('/pool.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maxWidth: "91vw",
            width: "100%",
            height: "230px",
            borderRadius: "7px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1E3769",
              height: "210px",
              width: "160px",
              borderRadius: "7px",
              marginLeft: "10px",
              marginTop: "10px",
              padding: "5px",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Stay Organized
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Securely Save vaccine records
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#4AA692",
                  borderWidth: "0px",
                  borderRadius: "7px",
                  color: "#000000",
                  fontSize: "14px",
                  width: "100px",
                  padding: "5px",
                }}
              >
                Shop Now
              </button>
            </div>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              We have curated the best products for pet travel
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundImage: "url('/vacaydog.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maxWidth: "91vw",
            width: "100%",
            height: "230px",
            borderRadius: "7px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1E3769",
              height: "210px",
              width: "160px",
              borderRadius: "7px",
              marginLeft: "10px",
              marginTop: "10px",
              padding: "5px",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Share Your Story
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Securely Save vaccine records
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#4AA692",
                  borderWidth: "0px",
                  borderRadius: "7px",
                  color: "#000000",
                  fontSize: "14px",
                  width: "100px",
                  padding: "5px",
                }}
              >
                Shop Now
              </button>
            </div>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              We have curated the best products for pet travel{" "}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundImage: "url('/chitravel.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maxWidth: "91vw",
            width: "100%",
            height: "230px",
            borderRadius: "7px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1E3769",
              height: "210px",
              width: "160px",
              borderRadius: "7px",
              marginLeft: "10px",
              marginTop: "10px",
              padding: "5px",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Get Ready, Get Going
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Securely Save vaccine records
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#4AA692",
                  borderWidth: "0px",
                  borderRadius: "7px",
                  color: "#000000",
                  fontSize: "14px",
                  width: "100px",
                  padding: "5px",
                }}
              >
                Shop Now
              </button>
            </div>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              We have curated the best products for pet travel
            </p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default MobileCarousel;
