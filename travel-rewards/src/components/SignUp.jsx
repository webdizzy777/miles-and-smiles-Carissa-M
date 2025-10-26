import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({setIsLoggedIn, setFirstName, firstName}){

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
                navigate('/dashboard');
            } else {
                const data = await response.json();
                //Show the user an error message
                setErrorMsg(data.message || 'Registration failed');
                setDisplayError(true);
            }

        } catch (error) {
            console.log('Error registering user:', error);
            //handle any network or fetch errors
            setErrorMsg('Network error. Please try again later.');
            setDisplayError(true);
        }
    }

    return(
        <main>
            <p>Welcome! Create your account:</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
                <br /><br />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
                <br /><br />
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' required />
                <br /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' minLength={8} maxLength={20} required  />
                <br /><br />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm password' minLength={8} maxLength={20} required />
                <br /><br />
                {displayError && (
                    <p className='center blackOpaque'>
                        <span className="material-symbols-outlined">warning</span> &nbsp;
                        {errorMsg}
                        &nbsp;<span className="material-symbols-outlined">warning</span>
                    </p>
                )}
                <button type="submit">Sign Up</button>  
            </form>
        </main>
    );
}

export default SignUp;