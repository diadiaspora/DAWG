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
                fontSize: "18px",
                textAlign: "center",
                marginTop: "0px",
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
                marginTop: "-16px",
              }}
            >
              Securely Save vaccine records
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                marginBottom: "8px",
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
                  height: "34px",
                  padding: "5px",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                Make a Profile
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
              Save all of your pets travel documents in one place for easy
              access.
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
                fontSize: "18px",
                textAlign: "center",
                marginTop: "0px",
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
                marginTop: "-16px",
              }}
            >
              Have you traveled with your pet?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                marginBottom: "8px",
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
                  height: "34px",
                  padding: "5px",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                Make a Post
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
              Help keep pets & their parents safe & stress free while traveling
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
                fontSize: "18px",
                textAlign: "center",
                marginTop: "0px",
              }}
            >
              Get Going
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "-16px",
              }}
            >
              Store your trip info and itenerary
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                marginBottom: "8px",
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
                  height: "34px",
                  padding: "5px",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                Start Planning
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
              Keep accommodation, flight, and all travel plans in one place.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundImage: "url('/labvaycay.png')",
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
                fontSize: "18px",
                textAlign: "center",
                marginTop: "0px",
              }}
            >
              Travel Prepared
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "15px",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "-16px",
              }}
            >
              Get everything you need to travel
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                marginBottom: "8px",
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
                  height: "34px",
                  padding: "5px",
                  marginTop: "8px",
                  marginBottom: "8px",
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
