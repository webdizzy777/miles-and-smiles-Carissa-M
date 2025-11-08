import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Header({firstName, isLoggedIn, setIsLoggedIn}){

    function displayLoggedInDetails() {
        if(isLoggedIn){
            return(
                <>
                    <div className='sideBySideThreeCard alignMiddle'><h2 className="center">Welcome, {firstName}!</h2></div>
                    <div className='sideBySideThreeCard alignBottom'><p className='center'><Link to='/dashboard'>Dashboard</Link> | <Link to='/card-management'>Card Management</Link> | <Link to='/about'>About Us</Link> | <Link to='#' onClick={() => setIsLoggedIn(false)} >Log Out</Link></p></div>    
                </>
            )
        } 
    }

    return(
        <>
            <header>
                <div className='container'>
                    <div className='sideBySideThreeCard'><Link to='/dashboard'><img src={Logo} alt="Travel Logo" /></Link>
                    <h1>Miles & Smiles</h1></div>
                    {displayLoggedInDetails()}
                </div>
            </header>
        </>
    );
}

export default Header;