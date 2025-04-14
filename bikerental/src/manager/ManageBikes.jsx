import React from 'react'
import ManagerSidebar from './ManagerSidebar'
import { Link } from 'react-router-dom'

function ManageBikes() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-light vh-100">
          <ManagerSidebar />
        </div>

        {/* Main content area */}
        <div className="col-md-9 col-lg-10 p-4">
          <Link to={`/CreateBikes`} className='btn btn-primary'>
            Add Bikes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ManageBikes
