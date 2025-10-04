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

const initialCards = [
    {
        id: 1,
        cardName: "Sam's Club",
        gas: 5,
        restaurant: 3,
        supermarket: 1,
        discount: 1,
        wholesale: 5,
        onlineShopping: 1,
        utilities: 1,
        internet: 1,
        phone: 1,
        travel: 1,
        other: 1,
        expiringRewards: "",
        expiringDate: "",
        notableBenefitTitle: "",
        notableBenefit: "",
        fee: 0, 
        dateOpened: "09/05/2022",
        apr: 25.24,
        creditLimit: 3000,
        balance: 500,
        dueDate: 2
    },
    {
        id:2,
        cardName: "Chase IHG",
        gas: 5,
        restaurant: 5,
        supermarket: 3,
        discount: 3,
        wholesale: 3,
        onlineShopping: 3,
        utilities: 3,
        internet: 3,
        phone: 3,
        travel: 5,
        other: 3,
        expiringRewards: "40,000 Point Night Award",
        expiringDate: "11/01/2025",
        notableBenefitTitle: "Redeem 3 Nights, get 4th Night Free",
        notableBenefit: "The fourth Reward Night is free when you redeem points for any stay of four or more nights.",
        fee: 99, 
        dateOpened: "05/01/2020",
        apr: 27.59,
        creditLimit: 6000,
        balance: 1270,
        dueDate: 15
    },
    {
        id:3,
        cardName: "Delta SkyMiles Platinum",
        gas: 1,
        restaurant: 2,
        supermarket: 2,
        discount: 1,
        wholesale: 1,
        onlineShopping: 1,
        utilities: 1,
        internet: 1,
        phone: 1,
        travel: 3,
        other: 1,
        expiringRewards: "Annual Companion Certificate",
        expiringDate: "09/01/2025",
        notableBenefitTitle: "TakeOff 15",
        notableBenefit: "Get 15% off anytime you book Award Travel with miles on Delta flights when using delta.com and the Fly Delta app.",
        fee: 350, 
        dateOpened: "12/20/2020",
        apr: 22.54,
        creditLimit: 7000,
        balance: 4530,
        dueDate: 2
    },
    {
        id:4,
        cardName: "Citi Strata Premier",
        gas: 3,
        restaurant: 3,
        supermarket: 3,
        discount: 1,
        wholesale: 1,
        onlineShopping: 1,
        utilities: 1,
        internet: 1,
        phone: 1,
        travel: 10,
        other: 1,
        expiringRewards: "$100 Annual Hotel Benefit",
        expiringDate: "12/31/2025",
        notableBenefitTitle: "",
        notableBenefit: "",
        fee: 95, 
        dateOpened: "03/20/2024",
        apr: 26.75,
        creditLimit: 3000,
        balance: 230,
        dueDate: 7
    }
];

function App() {

  //create a cards variable and a setter function to modify cards and pass to components
  //set the default value of the cards array to our initial card array
  const [cards, setCards] = useState(initialCards);

  //create a variable to hold if user is logged in and a setter function to set if user is logged in. 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/* Route the user to the relevant components when the URL parameter is recognized - check that value of isLogged in before allowing to router to dashboard, otherwise route to the login screen. Use replace to overwrite the history stack so back doesn't take to dashboard.*/}
      <Router>
        <Routes>
          <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard cards={cards} setCards={setCards} /> : <Navigate to="/" replace />} />
          <Route path='/about' element={<About />} />
          <Route path='/AddCardForm' element={<AddCardForm cards={cards} setCards={setCards} />} />
          <Route path='/PointsTable' element={<PointsTable cards={cards}/>} />
          <Route path='/ExpiringRewards' element={<ExpiringRewards cards={cards} setCards={setCards}/>} />
          <Route path='/NotableBenefits' element={<NotableBenefits cards={cards} />} />
          <Route path='/FinancialSnapshot' element={<FinancialSnapshot cards={cards} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
