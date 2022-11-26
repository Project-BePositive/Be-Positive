import React, { useState } from 'react';
import stateCity from './stateCity.json';
import { useNavigate } from 'react-router-dom';
const Example = () => {
    const [city, setCity] = useState([]);
    const handleState = (name) => {
        const n = stateCity.States.filter(x => x.sname === name);
        const dt = stateCity.Cities.filter(x => x.sid === n[0].id);
        setCity(dt);
    }
    const history = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        aadhar: "",
        password: "",
        gender: "",
        age: "",
        weight: "",
        bloodgroup: "",
        phno: "",
        state: "",
        city: "",
        disease: ""
    })
    const setData = (name, value) => {
        //console.log(e.target.value);
        //const {name,value}=e.target;
        setUser((preval) => {
            return {
                ...preval, [name]: value
            }
        })
    }

    function handleValidation() {
        var formIsValid = true;
        var age = parseInt(user.age);
        var weight = parseInt(user.weight);
        var aadhar = user.aadhar;
        var phno = user.phno;
        var email = user.email;
        if (age <= 18 || age >= 60) {
            formIsValid = false;
            user.error = "Age must be between 18 to 60.Please check the eligibility to donate blood.";

        }
        else if (aadhar.length != 12) {
            formIsValid = false;
            user.error = "Aadhar number must be of 12 digits."
        }
        else if (weight < 50) {
            formIsValid = false;
            user.error = "Weight must be above 60.Please check the eligibility to donate blood."
        }
        else if (phno.length < 10 || phno.length > 10) {
            formIsValid = false;
            user.error = "Phone number must have length 10."
        }
        /*else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {           //   \w for alphabets,\d for numbers
            formIsValid = false;
            user.error = "Email is not valid."
        }*/
        return formIsValid;
    }

    const addData = async (e) => {
        e.preventDefault(); //preventing from default submission
        if (!handleValidation()) {
            console.log(user.error);
            alert(user.error);
        }
        else {
            const { name, email, aadhar, password, gender, age, weight, bloodgroup, phno, state, city, disease } = user;
            const res = await fetch("http://localhost:8003/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, aadhar, password, gender, age, weight, bloodgroup, phno, state, city, disease
                })
            });

            const data = await res.json();
            console.log(data);
            if (res.status === 404 || !data) {
                alert("Err!");
                console.log("Error!");
            } else {
                alert("Data successfully added");
                history('/list');
            }
        }
    }

    return (
        <div class="example container">
            <div class="content">
                <form>
                    <div class="user-details">
                        <h4 class="heading">Register Your Details!</h4>
                        <div class="input-box2">
                            <span class="details">Name</span>
                            <input type="text" value={user.name} name="name" id="name" onChange={(e) => { setData('name', e.target.value) }} placeholder="Enter your name" />
                        </div>
                        <div class="input-box2">
                            <span class="details">Aadhar Card Number</span>
                            <input type="number" value={user.aadhar} name="aadhar" id="aadhar" onChange={(e) => { setData('aadhar', e.target.value) }} placeholder="Enter your aadhar card number without spaces" />
                        </div>
                        <div class="input-box">
                            <span class="details">Email</span>
                            <input type="email" value={user.email} name="email" id="email" onChange={(e) => { setData('email', e.target.value) }} placeholder="Enter your email" />
                        </div>
                        <div class="input-box">
                            <span class="details">Password</span>
                            <input type="password" value={user.password} name="password" id="password" onChange={(e) => { setData('password', e.target.value) }} placeholder="Enter your password" />
                        </div>

                        <div class="input-box2">
                            <input type="radio" name="gender" id="dot-1" value="Male" checked={user.gender === "Male"} onChange={(e) => { setData('gender', e.target.value) }} />
                            <input type="radio" name="gender" id="dot-2" value="Female" checked={user.gender === "Female"} onChange={(e) => { setData('gender', e.target.value) }} />
                            <input type="radio" name="gender" id="dot-3" value="Other" checked={user.gender === "Other"} onChange={(e) => { setData('gender', e.target.value) }} />
                            <span class="gender-title">Gender</span>
                            <div class="category">
                                <label for="dot-1">
                                    <span class="dot one"></span>
                                    <span class="gender"> Male</span>
                                </label>
                                <label for="dot-2">
                                    <span class="dot two"></span>
                                    <span class="gender"> Female</span>
                                </label>
                                <label for="dot-3">
                                    <span class="dot three"></span>
                                    <span class="gender"> Other</span>
                                </label>
                            </div>
                        </div>
                        <div class="input-box">
                            <span class="details">Age</span>
                            <input type="number" value={user.age} name="age" id="age" onChange={(e) => { setData('age', e.target.value) }} placeholder="Enter your age" />
                        </div>
                        <div class="input-box">
                            <span class="details">Weight</span>
                            <input type="number" value={user.weight} name="weight" id="weight" onChange={(e) => { setData('weight', e.target.value) }} placeholder="Enter your weight" />
                        </div>
                        <div class="input-box">
                            <span class="details">Blood Group</span>
                            <select class="bgrps" value={user.bloodgroup} onChange={(e) => {
                                setData('bloodgroup', e.target.value)
                            }}>
                                <option value="">---</option>
                                <option value="A+ve">A+ve</option>
                                <option value="B+ve">B+Ve</option>
                                <option value="O+ve">O+ve</option>
                                <option value="AB+ve">AB+ve</option>
                                <option value="A-ve">A-ve</option>
                                <option value="B-ve">B-ve</option>
                                <option value="O-ve">O-ve</option>
                                <option value="AB-ve">AB-ve</option>
                            </select>
                        </div>
                        <div class="input-box">
                            <span class="details">Phone Number</span>
                            <input type="number" value={user.phno} name="phno" id="phno" onChange={(e) => { setData('phno', e.target.value) }} placeholder="Enter your phone number" />
                        </div>
                        <div class="input-box">
                            <span class="details">State</span>
                            <select value={user.state} onChange={(e) => { handleState(e.target.value); setData('state', e.target.value) }}>
                                <option value="">---</option>
                                {
                                    stateCity.States.map((result) => (<option text={result.sname} id={result.id} value={result.sname}>{result.sname}</option>))
                                }
                            </select>
                        </div>
                        <div class="input-box">
                            <span class="details">City</span>
                            <select value={user.city} onChange={(e) => { setData('city', e.target.value) }}>
                                <option value="">---</option>
                                {
                                    city.map((ctr, index) => {
                                        return (<option key={index} value={ctr.cname}>{ctr.cname}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div class="input-box2 mt-2">
                            <span class="details">Kindly mention if you have any diseases,else fill NA</span>
                            <input type="text" value={user.disease} name="disease" id="disease" onChange={(e) => { setData('disease', e.target.value) }} placeholder="Enter diseases if any" />
                        </div>
                    </div>
                    <div class="button">
                        <button type="submit" onClick={addData}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Example;
