import React from 'react';
import ManagerSidebar from './ManagerSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';


function ManagerDashboard() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar Column - fixed width */}
        <div className="col-md-3 col-lg-2 d-md-flex bg-dark text-white vh-100 position-fixed">
          <ManagerSidebar />
        </div>
        
        {/* Main Content Column - offset for sidebar */}
        <div className="col-md-9 col-lg-10 ms-auto">
          <div className="p-4">
            <h1 className="mb-4">Welcome to Manager Dashboard</h1>
            <div className="card">
              <div className="card-body">
                <p className="card-text">This is your main content area.</p>
                {/* Add more dashboard content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;