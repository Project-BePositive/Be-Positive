import React from 'react';
import { Card, CardContent } from '@mui/material';
import {useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const Email=()=>{
    const navigate = useNavigate();
    const [email,setUser] = useState({
       name:"",
       purpose:"",
       contact:"",
    })
    

    const setData= (name,value)=>{
        setUser((preval)=>{
            return{
                ...preval,[name]:value
            }
        })
    }

    const { id } = useParams("");

    const sendEmail =  async(e)=>{
        e.preventDefault();
        const {name,purpose,contact} = email
        const res = await fetch(`http://localhost:8003/sendmail/${id}`,{
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },body:JSON.stringify({
                name,purpose,contact
             })
        });

        const data = await res.json();
        console.log(data);
        if(res.status===422 || !data){
            alert("error");
            console.log("error ");
        }
        else{
            alert("Email sent"); 
            navigate('/list');
            }
     }
    
    return(
        <div className="email container mt-3">
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <form>
                        <div class="form-group mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name"  value={email.name} placeholder="Enter your name" onChange={(e)=>{setData('name',e.target.value)}} />
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label">Purpose of Plasma Requirement</label>
                            <input type="text" class="form-control" name="purpose" valu={email.purpose} placeholder="Enter the purpose" onChange={(e)=>{setData('purpose',e.target.value)}} />
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label">Contact Number</label>
                            <input type="number" class="form-control" name="contact" value={email.contact} placeholder="Enter your contact number" onChange={(e)=>{setData('contact',e.target.value)}} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-danger" onClick={sendEmail}>Submit</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
export default Email;