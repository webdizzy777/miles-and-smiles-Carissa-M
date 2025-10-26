import Logo from '../assets/logo.png'

function Header({firstName, isLoggedIn}){
    return(
        <>
            <header>
                <div>
                    <img src={Logo} alt="Travel Logo" />
                    <h1>Miles & Smiles</h1>
                    {isLoggedIn && <h2>Welcome, {firstName}!</h2>}
                </div>
            </header>
        </>
    );
}

export default Header;