import React, {useState,useEffect} from 'react';
import styles from './donor.module.css';
import {Link} from 'react-router-dom';
const Donor = ()=>{
    const [donors,setDonors] =useState([{
        name:"",
        username:"",
        password:"",
        gender:"",
        age:"",
        bloodgroup:"",
        weight:"",
        phone:"",
        state:"",
        city:"",
        error:""
    }]);

    useEffect(()=>{
        fetch().then(res=>{
            if(res.ok) return res.json();
        }).then(jsonres=>setDonors(jsonres));
    })
    return(
        <>
        <h1 className={styles.heading}>Donors List</h1>
            <table className={styles.styledtable}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Weight</th>
                <th>Phone Number</th>
                <th>State</th>
                <th>City</th>
                <th>Update Info</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        { donors.map(donor =>
        <tr>
            <td>{donor.name}</td>
            <td>{donor.age}</td>
            <td>{donor.gender}</td>
            <td>{donor.bloodgroup}</td>
            <td>{donor.weight}</td>
            <td>{donor.phone}</td>
            <td>{donor.state}</td>
            <td>{donor.city}</td>
            <td><button className={styles.button}>Update
            {/*<Link to="" className={styles.link}></Link>*/}
            </button></td>
            <td><button className={styles.button}>Delete
            {/*<Link to="" className={styles.link}></Link>*/}
        </button></td>
        </tr>
        )}
        </tbody>
        </table>
        </>
    );
}

export default Donor;