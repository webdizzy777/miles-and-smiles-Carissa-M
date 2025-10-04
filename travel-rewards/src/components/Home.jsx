import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

function Home({setIsLoggedIn}){

    //login details
    const defaultEmail = "launchcode@unit1.com";
    const defaultPassword = "password";
    let errorMsg = (<p className='center blackOpaque'>
                        <span class="material-symbols-outlined">
                            warning
                        </span> &nbsp;
                        Incorrect Login Details
                        &nbsp;<span class="material-symbols-outlined">
                            warning
                        </span>
                    </p>);
    // using the useNavigate function from react-router-dom to navigate to the dashboard if login is true
    const navigate = useNavigate();

    //utilize useState to store the input fields from the form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // utilize useState to be able to set the display error to tue below
    const [displayError, setDisplayError] = useState(false)

    //we don't want the page to reload on submission
    //if our username and password match the default values set logged into true and navigate to dashboard or else display error
    function handleLogIn(e){
        e.preventDefault();
        if(email === defaultEmail && password === defaultPassword){
            setIsLoggedIn(true);
            navigate('/dashboard');
        } else {
            setDisplayError(true);
        }

    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="loginForm">
                    <h1><span className="blackOpaque">Unlock Your Next Destination!</span></h1> 
                    <h2><span className="blackOpaque">Sign In to See Your Rewards</span></h2>
                    <form onSubmit={handleLogIn}>
                        <label htmlFor="email"><span className="blackOpaque"><b>Email *</b></span>
                            <br />
                            <input type="email" id ="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Enter your email"   required />
                        </label>
                        <br /><br />
                        <label htmlFor="password"><span className="blackOpaque"><b>Password *</b></span>
                            <br />
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"  required />
                        </label>
                        <br /><br />
                            {displayError ? errorMsg : null}
                        <button type='submit' className="logInButton">Login</button>
                    </form>
                 </div>
                  <p className='card'>Miles & Smiles is your one-stop destination to track all your travel rewards so you can use them before you lose them! Check out our <Link to='/about'>About Us</Link> page to learn more.</p>
            </main>
            <Footer></Footer>
        </>
    );
}

export default Home;