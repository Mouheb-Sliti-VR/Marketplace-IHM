

const Carousel: React.FC = () => (
  <div id="myCarousel" className="carousel slide bg-black" data-bs-ride="carousel" data-bs-interval="5000" style={{ height: "450px" }}>
    <div className="carousel-inner h-100">
      <div className="carousel-item active h-100">
        <div className="row h-100">
          <div className="col-md-3 bg-black text-white d-flex align-items-center p-4">
            <div>
              <h5 className="fw-bold fs-4" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Access a Thriving User Network</h5>
              <p style={{ color: "#c4c4c4", fontSize: ".9em" }}>
                Join our extensive network of VR users and connect with potential customers. Benefit from targeted advertising and promotional offers that maximize your reach and impact.
              </p>
            </div>
          </div>
          <div className="col-md-9 h-100">
            <img
              src="/src/assets/Carousel/meta-avatars.webp"
              className="d-block w-100 h-100"
              alt="Slide 1"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="carousel-item h-100">
        <div className="row h-100">
          <div className="col-md-9 h-100">
            <img
              src="/src/assets/Carousel/cinema_thumbnail_placeholder.jpg"
              className="d-block w-100 h-100"
              alt="Slide 2"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-3 bg-black text-white d-flex align-items-center p-4">
            <div>
              <h5 className="fw-bold fs-4" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Engage with Interactive Content</h5>
              <p style={{ color: "#c4c4c4", fontSize: ".9em" }}>
                Leverage our platform to deliver captivating video content that resonates with users. Create memorable experiences that drive engagement and boost brand visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item h-100">
        <div className="row h-100">
          <div className="col-md-3 bg-black text-white d-flex align-items-center p-4">
            <div>
              <h5 className="fw-bold fs-4" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Unlock New Opportunities</h5>
              <p style={{ color: "#c4c4c4", fontSize: ".9em" }}>
                Partner with us to showcase your brand in immersive mini-games, reaching a vast audience of VR enthusiasts. Elevate your advertising strategy and engage users like never before.
              </p>
            </div>
          </div>
          <div className="col-md-9 h-100">
            <img
              src="/src/assets/Carousel/zombie_game_thumbnail_placeholder.jpg"
              className="d-block w-100 h-100"
              alt="Slide 3"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="carousel-indicators position-absolute start-50 translate-middle-x mx-auto">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active bg-white m-1 rounded-pill border border-secondary" aria-current="true" aria-label="Slide 1" style={{ width: "1.5em", height: "5px" }}></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" className="bg-white m-1 rounded-pill border border-secondary" aria-label="Slide 2" style={{ width: "1.5em", height: "5px" }}></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" className="bg-white m-1 rounded-pill border border-secondary" aria-label="Slide 3" style={{ width: "1.5em", height: "5px" }}></button>
    </div>
    
  </div>
);

export default Carousel;