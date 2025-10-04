import Logo from '../assets/logo.png'

function Header(){
    return(
        <>
            <header>
                <div>
                    <img src={Logo} alt="Travel Logo" />
                    <h1>Miles & Smiles</h1>
                </div>
            </header>
        </>
    );
}

export default Header;