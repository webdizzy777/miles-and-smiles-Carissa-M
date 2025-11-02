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

  //create a cards variable and a setter function to modify cards and pass to components
  //set the default value of the cards array to our initial card array
  
  //const [cards, setCards] = useState(initialCards);

  //create a variable to hold if user is logged in and a setter function to set if user is logged in. 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //create a variable to hold the user's first name and a setter function to set the first name
  const[firstName, setFirstName] = useState("");

  const [userId, setUserId] = useState(null);

  return (
    <>
      {/* Route the user to the relevant components when the URL parameter is recognized - check that value of isLogged in before allowing to router to dashboard, otherwise route to the login screen. Use replace to overwrite the history stack so back doesn't take to dashboard.*/}
      <Router>
          <Header firstName={firstName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn} setFirstName={setFirstName}  setUserId={setUserId}/>} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard userId={userId} /> : <Navigate to="/" replace />} />
          <Route path='/about' element={<About />} />
          <Route path='/AddCardForm' element={isLoggedIn ? <AddCardForm userId={userId} /> : <Navigate to="/" replace />} />
          <Route path='/PointsTable' element={<PointsTable userId={userId}/>} />
          <Route path='/ExpiringRewards' element={<ExpiringRewards userId={userId}/>} />
          <Route path='/NotableBenefits' element={<NotableBenefits userId={userId}/>} />
          <Route path='/FinancialSnapshot' element={<FinancialSnapshot userId={userId}/>} />
          <Route path='/SignUp' element={<SignUp setIsLoggedIn={setIsLoggedIn} setFirstName={setFirstName} setUserId={setUserId} firstName={firstName}/>} />
          <Route path='/CardManagement' element={isLoggedIn ? <CardManagement userId={userId} /> : <Navigate to="/" replace /> } />
          <Route path='/editCard/:cardId' element={isLoggedIn ? <EditCard userId={userId} /> : <Navigate to="/" replace /> } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          <Footer/>
      </Router>
    </>
  )
}

export default App
