// import React, { useState, useEffect } from "react";
// import Navbar from "../user/Navbar";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Rent = () => {
//   const [shops, setShops] = useState([]);

//   // Fetch registered shops when component mounts
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/shopregister") // Make sure this route returns all the shops
//       .then((response) => {
//         setShops(response.data); // Assuming the response contains an array of shops
//       })
//       .catch((error) => {
//         console.error("Error fetching shops:", error);
//       });
//   }, []);

//   return (
//     <div>
      
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Shops Available for Rent</h2>
//         <div className="row">
//           {shops.length > 0 ? (
//             shops.map((shop) => (
//               <div key={shop._id} className="col-md-4 mb-4">
//                 <div className="card">
//                 <img
//   src={`http://localhost:3001/uploads/${shop.image}`}
//   alt={shop.shopname}
//   className="card-img-top"
// />

//                   <div className="card-body">
//                     <h5 className="card-title">{shop.shopname}</h5>
//                     <p className="card-text">{shop.address}</p>
//                     {/* <p className="card-text">Contact: {shop.contact}</p>
//                     <p className="card-text">Manager: {shop.name}</p>
//                     <p className="card-text">Email: {shop.email}</p> */}
//                     <Link to={`/Viewshops/${shop._id}`} className="btn btn-dark mt-4" style={{display: "block", borderRadius: "10px"}}
                    
//                     >
//                       View Shop
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center w-100">No shops available at the moment.</p>
//           )}
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default Rent;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarDisplay from "./StarDisplay"; // import star component

const Rent = () => {
  const [shops, setShops] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

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

  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Shops Available for Rent</h2>
        <div className="row">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <div key={shop._id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={`http://localhost:3001/uploads/${shop.image}`}
                    alt={shop.shopname}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{shop.shopname}</h5>
                    <p className="card-text">{shop.address}</p>

                    {/* Show average rating */}
                    <StarDisplay rating={averageRatings[shop._id] || 0} />

                    <Link
                      to={`/Viewshops/${shop._id}`}
                      className="btn btn-dark mt-4"
                      style={{ display: "block", borderRadius: "10px" }}
                    >
                      View Shop
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No shops available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rent;
