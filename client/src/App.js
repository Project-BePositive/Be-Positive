import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Table from './components/Table';
import Register from './components/Register';
import DonationProcess from './components/DonationProcess';
import Eligibility from './components/Eligibility';
import Login from './components/Login';
import Update from './components/Update';
import Details from './components/Details';
import Contact from './components/Contact';
import BloodTypes from './components/BloodTypes';
import BloodBanks from './components/BloodBanks';
import Email from './components/Email';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Header />
        <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/list" element={<Table/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/eligibility" element={<Eligibility/>} />
              <Route path="/bloodtypes" element={<BloodTypes/>} />
              <Route path="/donation" element={<DonationProcess/>} />
              <Route path="/update/:id" element={<Update/>} />
              <Route path="/view/:id" element={<Details/>} />
              <Route path="/contact/:id" element={<Contact/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/bloodbanks" element={<BloodBanks/>} />
              <Route path="/email/:id" element={<Email/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
