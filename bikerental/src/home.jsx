import React from 'react'
import Navbar from './user/Navbar'
import HomeBody from './pages/HomeBody'

function Home() {
  return (
    <div>
   
       <HomeBody />
      
    </div>
  )
}

export default Home 



// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css'; // We'll create this CSS file

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { path: '/', name: 'Home' },
//     { path: '/about', name: 'About' },
//     { path: '/rent', name: 'Rent a Bike' },
//     { path: '/your-bike', name: 'Your Bike' },
//     { path: '/contact', name: 'Contact' }
//   ];

//   return (
//     <nav className="premium-navbar">
//       <div className="nav-container">
//         {/* Logo/Brand */}
//         <Link to="/" className="nav-brand">
//           <span className="nav-logo">🚴</span>
//           <span className="nav-brand-name">BikeRental</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="nav-desktop">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button 
//           className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle navigation"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <div className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;*/