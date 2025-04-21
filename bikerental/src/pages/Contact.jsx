/*import Navbar from "../user/Navbar";

const Contact = () => {
    return <h1>Contact Page</h1>;
  };
  
  export default Contact;*/


  import Navbar from "../user/Navbar";

const Contact = () => {
  return (
    <>

      {/* Contact Header and Form */}
      <div className="container-fluid py-5" style={{ backgroundColor: "#e2e2e2" }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted">Any questions or remarks? Just write us a message!</p>
        </div>

        <div className="container d-flex justify-content-center">
          <form className="w-75">
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Enter a valid email address"
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter your Name"
                />
              </div>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control rounded-4"
                rows="4"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="check1" />
              <label className="form-check-label" htmlFor="check1">
                I automatically accept that we're about our privacy and
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn rounded-pill text-white" style={{ backgroundColor: "#00b1b1" }}>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info Footer Section */}
      <div className="container-fluid py-5" style={{ backgroundColor: "#00b1b1" }}>
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="mb-3">
                <div className="bg-white rounded-circle d-inline-block p-3">
                  <span className="fs-4 text-info">&#x1F3C3;</span>
                </div>
              </div>
              <h5 className="fw-bold">ABOUT Rental Service</h5>
              <p className="mb-0">Running Guide</p>
              <p>Workouts</p>
            </div>

            <div className="col-md-4 mb-4 mb-md-0">
              <div className="mb-3">
                <div className="bg-white rounded-circle d-inline-block p-3">
                  <span className="fs-4 text-info">&#128222;</span>
                </div>
              </div>
              <h5 className="fw-bold">PHONE (LANDLINE)</h5>
              <p className="mb-0">+912 3 567 8987</p>
              <p>+912 5 252 3336</p>
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <div className="bg-white rounded-circle d-inline-block p-3">
                  <span className="fs-4 text-info">&#128205;</span>
                </div>
              </div>
              <h5 className="fw-bold">OUR OFFICE LOCATION</h5>
              <p className="mb-0">The Interior Design Studio Company</p>
              <p>Imadol, Tikathali</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
