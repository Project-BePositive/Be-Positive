import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
const Details = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    aadhar:"",
    password: "",
    gender: "",
    age: "",
    weight: "",
    bloodgroup: "",
    phno: "",
    state: "",
    city: "",
    disease:""
  })

  const { id } = useParams("");
  console.log(id);

  const getData = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    }
    else {
      setUser(data)
      console.log("Got data");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="details container mt-3">
      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <h2 className='heading'>Donor Details:</h2>
          
          <div className="row">
            <h6>Name : <span>{user.name}</span></h6>
            <div className="left-view col-lg-6">
              <h6>Email : <span>{user.email}</span></h6>
              <h6>Age : <span>{user.age}</span></h6>
              <h6>Gender : <span>{user.gender}</span></h6>
              <h6>Weight : <span>{user.weight}</span></h6>
              <h6>Disease : <span>{user.disease}</span></h6>
            </div>
            <div className="right-view col-lg-6">
              <h6>Blood Group : <span>{user.bloodgroup}</span></h6>
              <h6>Phone Number : <span>{user.phno}</span></h6>
              <h6>City : <span>{user.city}</span></h6>
              <h6>State : <span>{user.state}</span></h6>
            </div>
          </div>
          <Link to={`/email/${user._id}`}><button className="btn">Send Email</button></Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details;
