/*import Navbar from "../user/Navbar";

const About = () => {
    return <h2>About Us</h2>;
  };
  
  export default About;*/


  import Navbar from "../user/Navbar";

const About = () => {
  return (
    <>

      {/* Premium Hero Section */}
      <header className="position-relative overflow-hidden" style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39') center/cover no-repeat",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center"
      }}>
        <div className="container text-center text-white py-5">
          <h1 className="display-2 fw-bold mb-4" style={{letterSpacing: "1px"}}>OUR STORY</h1>
          <div className="divider mx-auto mb-4" style={{
            width: "100px",
            height: "3px",
            background: "linear-gradient(to right, #ffc107, #fd7e14)",
            borderRadius: "3px"
          }}></div>
          <p className="lead fs-3 mx-auto" style={{maxWidth: "700px", fontWeight: "300"}}>
            Redefining urban mobility through premium motorbike experiences across Nepal
          </p>
        </div>
      </header>

      {/* Premium Mission Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-1 order-2">
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39" 
                alt="Premium motorbike" 
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  height: "500px",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="ps-lg-5">
                <h2 className="display-5 fw-bold mb-4 text-dark">OUR PHILOSOPHY</h2>
                <p className="fs-5 mb-4 text-dark" style={{lineHeight: "1.8"}}>
                  We believe in transforming urban transportation through meticulously maintained premium bikes, 
                  unparalleled service, and a commitment to sustainable mobility solutions.
                </p>
                
                <div className="d-flex align-items-start mb-4 p-4 rounded-3" style={{backgroundColor: "#f8f9fa"}}>
                  <div className="bg-warning text-dark rounded-circle p-3 me-3 flex-shrink-0 shadow-sm">
                    <i className="bi bi-lightning fs-4"></i>
                  </div>
                  <div>
                    <h4 className="h5 mb-2 text-dark">SEAMLESS EXPERIENCE</h4>
                    <p className="mb-0 text-muted">From booking to drop-off, enjoy our frictionless rental process</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start p-4 rounded-3" style={{backgroundColor: "#f8f9fa"}}>
                  <div className="bg-success text-white rounded-circle p-3 me-3 flex-shrink-0 shadow-sm">
                    <i className="bi bi-shield-check fs-4"></i>
                  </div>
                  <div>
                    <h4 className="h5 mb-2 text-dark">PREMIUM PROTECTION</h4>
                    <p className="mb-0 text-muted">Comprehensive insurance and 24/7 roadside assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Values Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3 text-dark">OUR PILLARS</h2>
            <div className="divider mx-auto" style={{
              width: "80px",
              height: "2px",
              background: "#6c757d",
              borderRadius: "2px"
            }}></div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 h-100 bg-white shadow-sm">
                <div className="card-body text-center p-5">
                  <div className="icon-circle mb-4 mx-auto" style={{
                    width: "90px",
                    height: "90px",
                    background: "linear-gradient(135deg, #ff6b6b, #ff8e8e)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-heart-fill fs-3 text-white"></i>
                  </div>
                  <h3 className="h4 mb-3 text-dark fw-bold">CLIENT-CENTRIC</h3>
                  <p className="text-dark mb-0">
                    Your satisfaction drives every decision we make, from bike selection to customer support.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 h-100 bg-white shadow-sm">
                <div className="card-body text-center p-5">
                  <div className="icon-circle mb-4 mx-auto" style={{
                    width: "90px",
                    height: "90px",
                    background: "linear-gradient(135deg, #51cf66, #69db7c)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-globe2 fs-3 text-white"></i>
                  </div>
                  <h3 className="h4 mb-3 text-dark fw-bold">ECO-CONSCIOUS</h3>
                  <p className="text-dark mb-0">
                    We offset 100% of our carbon emissions and maintain a growing fleet of bikes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 h-100 bg-white shadow-sm">
                <div className="card-body text-center p-5">
                  <div className="icon-circle mb-4 mx-auto" style={{
                    width: "90px",
                    height: "90px",
                    background: "linear-gradient(135deg, #fcc419, #ffd43b)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className="bi bi-lightbulb-fill fs-3 text-white"></i>
                  </div>
                  <h3 className="h4 mb-3 text-dark fw-bold">FORWARD-THINKING</h3>
                  <p className="text-dark mb-0">
                    Continuously evolving our technology and services to anticipate your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h3 className="h4 mb-4 text-warning">BIKE RENT NEPAL</h3>
              <p className="mb-4 text-white-50" style={{lineHeight: "1.7"}}>
                Elevating your journey with Nepal's premier motorbike rental service, 
                offering unmatched quality and service since 2015.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-4 opacity-75 hover-opacity-100" style={{transition: "opacity 0.3s"}}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white fs-4 opacity-75 hover-opacity-100" style={{transition: "opacity 0.3s"}}>
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white fs-4 opacity-75 hover-opacity-100" style={{transition: "opacity 0.3s"}}>
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <h3 className="h4 mb-4 text-warning">CONNECT WITH US</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2 text-warning"></i> 
                  <span className="text-white-50">Kathmandu • Pokhara • Chitwan</span>
                </li>
                <li className="mb-3">
                  <i className="bi bi-telephone-fill me-2 text-warning"></i> 
                  <span className="text-white-50">Phone: +977-9801234567</span>
                </li>
                <li className="mb-3">
                  <i className="bi bi-envelope-fill me-2 text-warning"></i> 
                  <span className="text-white-50">E-mail: bikerentnepal@.com</span>
                </li>
                <li>
                  <i className="bi bi-clock-fill me-2 text-warning"></i> 
                  <span className="text-white-50">Time: 7:00 - 10:00</span>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-5 border-secondary" />
          <div className="text-center text-white-50 small">
            &copy; 2025 BIKERENT NEPAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
  