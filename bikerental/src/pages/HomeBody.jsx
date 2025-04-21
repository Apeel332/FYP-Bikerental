/*import Navbar from "../user/Navbar";
const Home = () => {
    return <h2>Home</h2>;
  };
  
  export default Home;*/

  import Navbar from "../user/Navbar";

const HomeBody = () => {
  return (
    <>

      {/* Hero Section */}
      <header
        id="home"
        className="text-white text-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604771784537-36a7a4fa8d01')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="container py-5 bg-dark bg-opacity-75 rounded"
          style={{ marginTop: "70px" }}
        >
          <h1 className="display-4 fw-bold">Explore the City with Ease</h1>
          <p className="lead">Rent bikes anytime, anywhere in Kathmandu.</p>
          <a href="#features" className="btn btn-warning btn-lg mt-3">
            See Features
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">Why Choose Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Affordable Rates</h5>
                  <p className="card-text">
                    Best prices for daily, weekly, or monthly rentals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Multiple Bike Options</h5>
                  <p className="card-text">
                    Choose from scooters, mountain bikes, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Real-time Tracking</h5>
                  <p className="card-text">
                    Track your ride for safety and convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-warning text-dark text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Need Help or Have Questions?</h2>
          <p className="lead">Feel free to reach out anytime.</p>
          <a href="#" className="btn btn-dark btn-lg">
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">© 2025 BikeRent | Made with care in Nepal</p>
        </div>
      </footer>
    </>
  );
};

export default HomeBody;

  