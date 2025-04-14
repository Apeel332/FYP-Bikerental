import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/admindashboard'

function Admin() {
    const [suc, setSuc ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() =>{
        axios
        .get("http://localhost:3001/admin",)
        .then((result) => {
          if(result.data === "Success") {
            setSuc("Successded Ok")
          } else {
            navigate ('/home')
          }
        })
        .catch((err) => console.log(err));
    }, [])
  return (
    <div>
      
      {/* <p> {suc} </p> */}
      <AdminDashboard />
    </div>
  )
}

export default Admin
