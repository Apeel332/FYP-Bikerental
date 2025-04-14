import React, { useState } from 'react';
import { Container, Button, Card, Table, Modal, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from './adminsidebar';

const AdminDashboard = () => {
  
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa', padding: '20px', position: 'fixed' }}>
        <AdminSidebar />
      </div>  
    </div>
  );
};

export default AdminDashboard;
