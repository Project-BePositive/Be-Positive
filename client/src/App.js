import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar.jsx';
import DonorForm from './Components/Form/DonorForm/form';
import DonorList from './Components/List/Donor/donor';
import Login from './Components/List/Donor/login';
import UpdateDonor from './Components/List/Donor/update';

const App = () =>{
    return(
     <Router>
         <NavBar />
        <Route exact path="/bepositive/donateblood" component={DonorForm} />
        <Route exact path="/bepositive/getdonors" component={DonorList}/>
        <Route exact path="/bepositive/login" component={Login}/>
        <Route exact path="/bepositive/loginanddelete" component={Login}/>
        <Route exact path="/bepositive/updatedonor" component={UpdateDonor}/>
    </Router>
    )
}

export default App;