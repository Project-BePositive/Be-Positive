import React, {useState} from 'react';
//import { useHistory } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
const UpdateForm = () =>{
    //const history=useHistory();
    const navigate=useNavigate();
    const [user,setUser] = useState({
        username:"",
        age:"",
        bloodgroup:"",
        weight:"",
        phone:"",
        state:"",
        city:"",
        error:""
    })

    let ename,value;
    const handleInputs=(e)=>{
     
        ename=e.target.name;
        value=e.target.value;
        setUser({...user, [ename] : value });
    }
    function handleValidation()
    {
     
        var formIsValid = true;
        var age=parseInt(user.age);
        var weight=parseInt(user.weight);
        if(age<=18 || age>=60)
        {
            formIsValid=false;
            user.error="Age should be between 18 to 60. Please check the eligibility to donate blood.";
        } 
        else if(weight<50)
        {
            formIsValid=false;
            user.error="Weight should above 50. Please check the eligibility to donate blood."
        }
        return formIsValid;
    }

    const UpdateData = async(e) =>{
        e.preventDefault();
        if(!handleValidation())
        {
            alert(user.error);
        }
        else
        {
        const {username, age, bloodgroup,weight, phone, state, city}= user;

        const res=await fetch("http://localhost:5002/bepositive/updatedonor", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body:JSON.stringify({
                username, age, bloodgroup, weight, phone, state, city
            })
        });

        const data=await res.json();
        console.log(res.status);
        if(res.status === 422) 
        {
            alert(data.error);
        }
        else
        {
            //alert("Registration successful");
            //history.push("getdonors");
            navigate('/getdonors');
        }
        }
    }
return(
        <div className="signup-form" >
            <h2 className="heading">Update your Information</h2>
            <form method="POST" className="register-form" id="register-form">
            <div class="form-group">
        <span className="labels">Username *</span>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span class="fa fa-user"></span>
                    </span>
                </div>
                <input 
                type="text" 
                class="form-control" 
                name="username" 
                value={user.username}
                onChange={handleInputs}
                placeholder="Enter your username" 
                required="required" />
            </div>
        </div>
        <div class="form-group">
                <span className="labels">Age * (Should be between 18 to 60)</span>
                    <div class="input-group">
                        
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-paper-plane"></i>
                            </span>
                        </div>
                        <input 
                        type="number" 
                        class="form-control" 
                        name="age" 
                        value={user.age} 
                        onChange={handleInputs}
                        placeholder="Enter your age" 
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                <span className="labels">Blood Group *</span>
                    <div className="input-group">
                        <input 
                        type="radio" 
                        id="O+" 
                        name="bloodgroup" 
                        value="O+"
                        checked={user.bloodgroup === "O+"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="O+">O+</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="O-" 
                        name="bloodgroup" 
                        value="O-"
                        checked={user.bloodgroup === "O-"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="O-">O-</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="A+" 
                        name="bloodgroup" 
                        value="A+"
                        checked={user.bloodgroup === "A+"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="A+">A+</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="A-" 
                        name="bloodgroup" 
                        value="A-"
                        checked={user.bloodgroup === "A-"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="A-">A-</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="B+" 
                        name="bloodgroup" 
                        value="B+"
                        checked={user.bloodgroup === "B+"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="B+">B+</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="B-" 
                        name="bloodgroup" 
                        value="B-"
                        checked={user.bloodgroup === "B-"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="B-">B-</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="AB+" 
                        name="bloodgroup" 
                        value="AB+"
                        checked={user.bloodgroup === "AB+"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="AB+">A+</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="AB-" 
                        name="bloodgroup" 
                        value="AB-"
                        checked={user.bloodgroup === "AB-"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="AB-">AB-</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input 
                        type="radio" 
                        id="no" 
                        name="bloodgroup" 
                        value="Don't Know"
                        checked={user.bloodgroup === "Don't Know"}
                        onChange={handleInputs}
                        />&nbsp;
                        <span className="radiolabels"  for="no">Don't Know</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <div class="form-group">
                <span className="labels">Weight *</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-phone"></i>
                            </span>
                        </div>
                        <input 
                        type="number" 
                        class="form-control" 
                        name="weight" 
                        value={user.weight} 
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                <span className="labels">Phone Number *</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-phone"></i>
                            </span>
                        </div>
                        <input 
                        type="number" 
                        class="form-control" 
                        name="phone" 
                        value={user.phone} 
                        onChange={handleInputs}
                        placeholder="Enter your 10 digit phone number" 
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <span className="labels">State *</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-briefcase"></i>
                            </span>
                        </div>
                        <input 
                        type="text" 
                        class="form-control"
                        name="state" 
                        value={user.state} 
                        onChange={handleInputs}
                        placeholder="Enter your state" 
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <span className="labels">City *</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-briefcase"></i>
                            </span>
                        </div>
                        <input 
                        type="text" 
                        class="form-control" 
                        name="city" 
                        value={user.city} 
                        onChange={handleInputs}
                        placeholder="Enter your city" 
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" name="register" id="register" onClick={UpdateData} class="btn btn-primary btn-lg">Submit</button>
                </div>
                </form>
            </div>
    
)}

export default UpdateForm;