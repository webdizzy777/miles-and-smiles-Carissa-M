import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import About from './components/About.jsx';
import AddCardForm from './components/AddCardForm.jsx';
import PointsTable from './components/PointsTable.jsx';
import { useState } from 'react';
import ExpiringRewards from './components/ExpiringRewards.jsx';
import NotableBenefits from './components/NotableBenefits.jsx';
import FinancialSnapshot from './components/FinancialSnapshot.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SignUp from './components/SignUp.jsx';
import CardManagement from './components/CardManagement.jsx';
import EditCard from './components/EditCard.jsx';

function App() {

  //App level state to track if user is logged in, their first name and userId
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <>
      {/* Route the user to the relevant components when the URL parameter is recognized - check that the user isLogged in before allowing to render, 
      otherwise route to the login screen. Use replace to overwrite the history stack so back doesn't take to dashboard.*/}
      <Router>
          <Header firstName={firstName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn} setFirstName={setFirstName}  setUserId={setUserId}/>} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard userId={userId} /> : <Navigate to="/" replace />} />
          <Route path='/about' element={<About />} />
          <Route path='/add-card-form' element={isLoggedIn ? <AddCardForm userId={userId} /> : <Navigate to="/" replace />} />
          <Route path='/points-table' element={isLoggedIn ? <PointsTable userId={userId}/> : <Navigate to="/" replace /> }/>
          <Route path='/expiring-rewards' element={isLoggedIn ? <ExpiringRewards userId={userId}/> : <Navigate to="/" replace />} />
          <Route path='/notable-benefits' element={isLoggedIn ? <NotableBenefits userId={userId}/>: <Navigate to="/" replace /> } />
          <Route path='/financial-snapshot' element={isLoggedIn ? <FinancialSnapshot userId={userId}/> : <Navigate to="/" replace /> } />
          <Route path='/sign-up' element={<SignUp setIsLoggedIn={setIsLoggedIn} setFirstName={setFirstName} setUserId={setUserId} firstName={firstName}/>} />
          <Route path='/card-management' element={isLoggedIn ? <CardManagement userId={userId} /> : <Navigate to="/" replace /> } />
          <Route path='/edit-card/:cardId' element={isLoggedIn ? <EditCard userId={userId} /> : <Navigate to="/" replace /> } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          <Footer/>
      </Router>
    </>
  )
}

export default App