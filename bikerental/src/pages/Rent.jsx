import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarDisplay from "./StarDisplay";

const Rent = () => {
  const [shops, setShops] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1); // NEW state
  const shopsPerPage = 3; // Only show 3 cards per page

  useEffect(() => {
    axios
      .get("http://localhost:3001/shopregister")
      .then((response) => {
        setShops(response.data);

        const fetchRatings = async () => {
          const ratings = {};
          for (let shop of response.data) {
            try {
              const res = await axios.get(`http://localhost:3001/reviews/average/${shop._id}`);
              ratings[shop._id] = res.data.averageRating || 0;
            } catch (error) {
              console.error("Rating fetch failed for", shop._id, error);
              ratings[shop._id] = 0;
            }
          }
          setAverageRatings(ratings);
        };

        fetchRatings();
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, []);

  const filteredShops = shops
    .filter((shop) => {
      const query = searchQuery.toLowerCase();
      return (
        shop.shopname.toLowerCase().includes(query) ||
        shop.address.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const ratingA = averageRatings[a._id] || 0;
      const ratingB = averageRatings[b._id] || 0;
      return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

  // Pagination Logic
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);

  const handleNextPage = () => {
    if (indexOfLastShop < filteredShops.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Shops Available for Rent</h2>

        {/* Search and Sort Section */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by shop name or location"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page after search
                }}
              />
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1); // Reset to first page after sorting
                }}
                style={{ maxWidth: "200px" }}
              >
                <option value="desc">Most Rated</option>
                <option value="asc">Least Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shop Cards */}
        <div className="row">
          {currentShops.length > 0 ? (
            currentShops.map((shop) => (
              <div key={shop._id} className="col-md-4 mb-4 d-flex align-items-stretch">
                <div className="card bg-light w-100" style={{ minHeight: "420px" }}>
                  <img
                    src={`http://localhost:3001/uploads/${shop.image}`}
                    alt={shop.shopname}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                      <StarDisplay rating={averageRatings[shop._id] || 0} />
                    </div>
                    <h5 className="card-title text-dark">{shop.shopname}</h5>
                    <p className="card-text text-dark">{shop.address}</p>
                    <div className="mt-auto">
                      <Link
                        to={`/Viewshops/${shop._id}`}
                        className="btn btn-dark w-100"
                        style={{ borderRadius: "10px" }}
                      >
                        View Shop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No shops match your search.</p>
          )}
        </div>

        {/* Pagination Buttons */}
        {filteredShops.length > shopsPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={handlePrevPage}
              className="btn btn-outline-dark me-2"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="btn btn-dark"
              disabled={indexOfLastShop >= filteredShops.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;
