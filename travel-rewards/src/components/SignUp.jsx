import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp({setIsLoggedIn, setFirstName, setUserId, firstName}){

    //Declare state variables to hold form data and error display
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    //function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    async function registerUser() {
        try {
            //reset error display on new registration attempt
            setDisplayError(false); 
            setErrorMsg('')

            //check that password and confirm password match
            if(password !== confirmPassword){
                setErrorMsg("Passwords do not match");
                setDisplayError(true);
                return;
            }

            //Send a POST request to the server with the form data
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password})
            });

            //Wait for the response from the server
            if(response.ok){
                //Convert the response to JSON
                const data = await response.json();
                setFirstName(data.firstName);
                //Set the user as logged in in the App component
                setIsLoggedIn(true);
                setUserId(data.userId);
                navigate('/dashboard');
            } else {
                const data = await response.json();
                //Show the user an error message
                setErrorMsg(data.message || 'Registration failed');
                setDisplayError(true);
            }

        } catch (error) {
            //handle any network or fetch errors
            setErrorMsg('Network error. Please try again later. Message: ' + error.message);
            setDisplayError(true);
        }
    }

    return(
        <main>
            <div className="customForm">
                <h2><span className = "blackOpaque"> Welcome! Create your account:</span></h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName"><span className="blackOpaque"><b>First Name: *</b></span></label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter First Name' required />
                    <br /><br />
                    <label htmlFor="lastName"><span className="blackOpaque"><b>Last Name: *</b></span></label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter Last Name' required />
                    <br /><br />
                    <label htmlFor="email"><span className="blackOpaque"><b>Email: *</b></span></label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' required />
                    <br /><br />
                    <label htmlFor="password"><span className="blackOpaque"><b>Password: *</b></span></label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' minLength={8} maxLength={20} required  />
                    <br /><br />
                    <label htmlFor="confirmPassword"><span className="blackOpaque"><b>Confirm Password: *</b></span></label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' minLength={8} maxLength={20} required />
                    <br /><br />
                    {displayError && (
                        <p className='center blackOpaque'>
                            <span className="material-symbols-outlined">warning</span> &nbsp;
                            {errorMsg}
                            &nbsp;<span className="material-symbols-outlined">warning</span>
                        </p>
                    )}
                    <button className='customButton' type="submit">Sign Up</button>  
                </form>
                <p className='center'>
                    <span className='blackOpaque whiteLink'>- Or <Link className='white' to='/'> Back to Login </Link> -</span> 
                </p>
            </div>
        </main>
    );
}

export default SignUp;