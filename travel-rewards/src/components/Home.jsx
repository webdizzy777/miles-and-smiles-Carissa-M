import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

function Home({setIsLoggedIn, setFirstName, setUserId}) {

    // using the useNavigate function from react-router-dom to navigate to the dashboard if login is true
    const navigate = useNavigate();

    //useState to store the input fields from the form and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayError, setDisplayError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function loginUser() {
        try {
            // reset error display on new login attempt
            setDisplayError(false);
            setErrorMsg('');

            //Send a POST request to the server with the email and password
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            //Convert the response to JSON
            const data = await response.json();

            //Wait for the response from the server
            if(response.ok){
                //Pull the first name from the data returned and set it in the App component
                setFirstName(data.firstName);
                //Set the user as logged in in the App component
                setIsLoggedIn(true);
                //Set the userId in the App component
                setUserId(data.userId);
                navigate('/dashboard');
            } else {
                //Show the user an error message
                setErrorMsg(data.message || "Incorrect login details");
                setDisplayError(true);
            }

        } catch (error) {
            console.log("Error fetching user data:", error);
            setErrorMsg("Network error. Please try again later.");
            setDisplayError(true);
        }
    }

    function handleLogIn(e){
        e.preventDefault();
        loginUser();       
    }

    return(
        <>
            <main>
                <div className="customForm">
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
                            {displayError && (
                                <p className='center blackOpaque'>
                                    <span className="material-symbols-outlined">warning</span> &nbsp;
                                    {errorMsg}
                                    &nbsp;<span className="material-symbols-outlined">warning</span>
                                </p>
                            )}
                        <button type='submit' className="customButton">Login</button>
                    </form>
                    <p className='center'>
                       <span className='blackOpaque whiteLink'>- Or <Link className='white' to='/sign-up'> Sign Up </Link> -</span> 
                    </p>
                 </div>
                  <p className='card'>Miles & Smiles is your one-stop destination to track all your travel rewards so you can use them before you lose them! Check out our <Link to='/about'>About Us</Link> page to learn more.</p>
            </main>
        </>
    );
}

export default Home;