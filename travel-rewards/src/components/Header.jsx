import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Header({firstName, isLoggedIn, setIsLoggedIn}){

    function displayLoggedInDetails() {
        if(isLoggedIn){
            return(
                <>
                    <p className="center">Welcome, {firstName}!</p>
                    <p><Link to='/dashboard'>Dashboard</Link> | <Link to='#'>Card Management</Link> | <Link to='/about'>About Us</Link> | <Link to='#' onClick={() => setIsLoggedIn(false)} >Log Out</Link></p>     
                </>
            )
        } 
    }

    return(
        <>
            <header>
                <div>
                    <img src={Logo} alt="Travel Logo" />
                    <h1>Miles & Smiles</h1>
                    {displayLoggedInDetails()}  
                </div>
            </header>
        </>
    );
}

export default Header;